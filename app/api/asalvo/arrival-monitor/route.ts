import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { buildParticipantDateTime } from "@/lib/asalvo/datetime";
import { sendPush } from "@/lib/asalvo/sendPush";

export async function GET(request: Request) {

  const authHeader =
    request.headers.get("authorization");

  const cronSecret =
    process.env.CRON_SECRET;

  if (
    !cronSecret ||
    authHeader !== `Bearer ${cronSecret}`
  ) {
    return NextResponse.json(
      {
        success: false,
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const supabase = await createSupabaseServerClient();

    const { data: participants, error } = await supabase
      .from("participants")
      .select("*");

    if (error) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 500 }
      );
    }

    const now = new Date();

    const waiting =
      participants?.filter(
        (p) => p.automation_stage === "waiting"
      ) ?? [];

    const windowStarted =
      participants?.filter(
        (p) => p.automation_stage === "window_started"
      ) ?? [];

    const firstReminderSent =
      participants?.filter(
        (p) => p.automation_stage === "first_reminder_sent"
      ) ?? [];

    const secondReminderSent =
      participants?.filter(
        (p) => p.automation_stage === "second_reminder_sent"
      ) ?? [];

    // waiting -> window_started

    const readyToStartWindow = waiting
      .filter(
        (p) =>
          p.arrival_date &&
          p.arrival_from
      )
      .map((p) => {
        const arrivalStart =
          buildParticipantDateTime(
            p.arrival_date,
            p.arrival_from,
            p.timezone
          );

        return {
          participant: p,
          arrivalStart,
        };
      })
      .filter(
        ({ arrivalStart }) =>
          now >= arrivalStart
      )
      .map(
        ({ participant, arrivalStart }) => ({
          id: participant.id,
          nickname: participant.nickname,
          automation_stage:
            participant.automation_stage,
          arrivalStart:
            arrivalStart.toISOString(),
        })
      );

    const participantIdsToUpdate =
      readyToStartWindow.map(
        (p) => p.id
      );

    let updated = 0;

    if (
      participantIdsToUpdate.length > 0
    ) {
      const { error: updateError } =
        await supabase
          .from("participants")
          .update({
            automation_stage:
              "window_started",
          })
          .in(
            "id",
            participantIdsToUpdate
          );

      if (!updateError) {
        updated =
          participantIdsToUpdate.length;
      }
    }

    // window_started -> first_reminder_sent

    const readyForFirstReminder =
      windowStarted
        .filter(
          (p) =>
            p.arrival_date &&
            p.arrival_to
        )
        .map((p) => {
          const arrivalLimit =
            buildParticipantDateTime(
              p.arrival_date,
              p.arrival_to,
              p.timezone
            );

          const firstReminderTime =
            new Date(
              arrivalLimit.getTime() -
                10 * 60 * 1000
            );

          return {
            participant: p,
            firstReminderTime,
          };
        })
        .filter(
          ({ firstReminderTime }) =>
            now >= firstReminderTime
        )
        .map(
          ({
            participant,
            firstReminderTime,
          }) => ({
            id: participant.id,
            nickname:
              participant.nickname,
            firstReminderTime:
              firstReminderTime.toISOString(),
          })
        );

    const firstReminderIdsToUpdate =
      readyForFirstReminder.map(
        (p) => p.id
      );

    let firstReminderUpdated = 0;

    if (
  firstReminderIdsToUpdate.length > 0
) {
  const successfulParticipants: string[] = [];

  for (const participant of readyForFirstReminder) {
    const result =
      await sendPush({
        participantId: participant.id,
        title: "A Salvo! 🏎️💚",
        body: "¿Llegaste a destino o querés actualizar el horario?",
      });

     

    if (result.success) {
      successfulParticipants.push(
        participant.id
      );
    }
  }

  if (successfulParticipants.length > 0) {
    const {
      error: firstReminderError,
    } = await supabase
      .from("participants")
      .update({
        automation_stage:
          "first_reminder_sent",
      })
      .in(
        "id",
        successfulParticipants
      );

    if (!firstReminderError) {
      firstReminderUpdated =
        successfulParticipants.length;
    }
  }
}

// first_reminder_sent -> second_reminder_sent

const readyForSecondReminder =
  firstReminderSent
    .filter(
      (p) =>
        p.arrival_date &&
        p.arrival_to
    )
    .map((p) => {
      const arrivalLimit =
        buildParticipantDateTime(
          p.arrival_date,
          p.arrival_to,
          p.timezone
        );

      const secondReminderTime =
        new Date(
          arrivalLimit.getTime() +
            1 * 60 * 1000
        );

      return {
        participant: p,
        secondReminderTime,
      };
    })
    .filter(
      ({ secondReminderTime }) =>
        now >= secondReminderTime
    )
    .map(
      ({
        participant,
        secondReminderTime,
      }) => ({
        id: participant.id,
        nickname:
          participant.nickname,
        secondReminderTime:
          secondReminderTime.toISOString(),
      })
    );

let secondReminderUpdated = 0;

if (
  readyForSecondReminder.length > 0
) {
  const successfulParticipants: string[] = [];

  for (const participant of readyForSecondReminder) {
    const result =
      await sendPush({
        participantId: participant.id,
        title: "A Salvo! 🏎️💚",
        body: "Todavía no registramos tu llegada. ¿Querés confirmar tu llegada o actualizar el horario?",
      });

   

    if (result.success) {
      successfulParticipants.push(
        participant.id
      );
    }
  }

  if (successfulParticipants.length > 0) {
    const {
      error: secondReminderError,
    } = await supabase
      .from("participants")
      .update({
        automation_stage:
          "second_reminder_sent",
      })
      .in(
        "id",
        successfulParticipants
      );

    if (!secondReminderError) {
      secondReminderUpdated =
        successfulParticipants.length;
    }
  }
}

  const readyForGroupNotification =
  secondReminderSent
    .filter(
      (p) =>
        p.arrival_date &&
        p.arrival_to
    )
    .map((p) => {
      const arrivalLimit =
        buildParticipantDateTime(
          p.arrival_date,
          p.arrival_to,
          p.timezone
        );

      const groupNotificationTime =
        new Date(
          arrivalLimit.getTime() +
            16 * 60 * 1000
        );

      return {
        participant: p,
        groupNotificationTime,
      };
    })
    .filter(
      ({ groupNotificationTime }) =>
        now >= groupNotificationTime
    );

let groupNotificationUpdated = 0;

for (const item of readyForGroupNotification) {
  const participant =
    item.participant;

  const { data: members } =
    await supabase
      .from("participants")
      .select("id")
      .eq(
        "group_id",
        participant.group_id
      );

  if (!members?.length) {
    continue;
  }

  let successCount = 0;

  for (const member of members) {
    const result =
      await sendPush({
        participantId: member.id,
        title: "A Salvo! 🏎️💚",
        body: `${participant.nickname} aún no confirmó su llegada.`,
      });

  
    if (result.success) {
      successCount++;
    }
  }

  if (successCount > 0) {
    const {
      error: groupNotificationError,
    } = await supabase
      .from("participants")
      .update({
        automation_stage:
          "group_notified",
      })
      .eq(
        "id",
        participant.id
      );

    if (!groupNotificationError) {
      groupNotificationUpdated++;
    }
  }
}
    return NextResponse.json({
      success: true,
      updated,
      firstReminderUpdated,
      secondReminderUpdated,
      groupNotificationUpdated,
      totals: {
        participants:
          participants.length,
        waiting: waiting.length,
        windowStarted:
          windowStarted.length,
        firstReminderSent:
          firstReminderSent.length,
        secondReminderSent:
          secondReminderSent.length,
      },
      readyToStartWindow,
      readyForFirstReminder,
      readyForSecondReminder,
      readyForGroupNotification,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Unexpected error",
      },
      { status: 500 }
    );
  }
}