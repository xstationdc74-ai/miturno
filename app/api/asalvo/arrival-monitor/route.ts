import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { buildParticipantDateTime } from "@/lib/asalvo/datetime";

export async function GET() {
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
      firstReminderIdsToUpdate.length >
      0
    ) {
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
          firstReminderIdsToUpdate
        );

      if (!firstReminderError) {
        firstReminderUpdated =
          firstReminderIdsToUpdate.length;
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

    const secondReminderIdsToUpdate =
      readyForSecondReminder.map(
        (p) => p.id
      );

    let secondReminderUpdated = 0;

    if (
      secondReminderIdsToUpdate.length >
      0
    ) {
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
          secondReminderIdsToUpdate
        );

      if (!secondReminderError) {
        secondReminderUpdated =
          secondReminderIdsToUpdate.length;
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
    )
    .map(
      ({
        participant,
        groupNotificationTime,
      }) => ({
        id: participant.id,
        nickname:
          participant.nickname,
        groupNotificationTime:
          groupNotificationTime.toISOString(),
      })
    );

const groupNotificationIdsToUpdate =
  readyForGroupNotification.map(
    (p) => p.id
  );

let groupNotificationUpdated = 0;

if (
  groupNotificationIdsToUpdate.length >
  0
) {
  const {
    error: groupNotificationError,
  } = await supabase
    .from("participants")
    .update({
      automation_stage:
        "group_notified",
    })
    .in(
      "id",
      groupNotificationIdsToUpdate
    );

  if (!groupNotificationError) {
    groupNotificationUpdated =
      groupNotificationIdsToUpdate.length;
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