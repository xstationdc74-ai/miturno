import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      groupName,
      nickname,
      fromTime,
      toTime,
    } = body;

    const supabase =
      await createSupabaseServerClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        {
          error: "Usuario no autenticado",
        },
        { status: 401 }
      );
    }

    const {
      data: group,
      error: groupError,
    } = await supabase
      .from("groups")
      .insert({
        name: groupName,
        status: "active",
        arrival_from: fromTime,
        arrival_to: toTime,
        owner_id: user.id,
      })
      .select()
      .single();

    if (groupError) {
      return NextResponse.json(
        { error: groupError.message },
        { status: 500 }
      );
    }

    const {
      data: participant,
      error: participantError,
    } = await supabase
      .from("participants")
      .insert({
  group_id: group.id,
  user_id: user.id,
  nickname,
  status: "pending",

  automation_stage: "waiting",

  arrival_from: fromTime,
  arrival_to: toTime,

  arrival_date: new Date()
    .toISOString()
    .split("T")[0],

  timezone:
    Intl.DateTimeFormat()
      .resolvedOptions()
      .timeZone,
})
      .select()
      .single();

    if (participantError) {
      return NextResponse.json(
        { error: participantError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      inviteToken: group.invite_token,
      groupId: group.id,
      participantToken:
        participant.participant_token,
    });

  } catch {
    return NextResponse.json(
      {
        error: "Unexpected error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const supabase =
      await createSupabaseServerClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        {
          error: "Usuario no autenticado",
        },
        { status: 401 }
      );
    }

    const { data, error } =
      await supabase
        .from("participants")
        .select(`
          nickname,
          groups (
            id,
            name,
            status,
            owner_id,
            created_at
          )
        `)
        .eq("user_id", user.id);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    const groups = data.map(
      (item: any) => ({
        nickname: item.nickname,
        ...(Array.isArray(item.groups)
          ? item.groups[0]
          : item.groups),
      })
    );

    return NextResponse.json(groups);

  } catch {
    return NextResponse.json(
      {
        error: "Unexpected error",
      },
      { status: 500 }
    );
  }
}