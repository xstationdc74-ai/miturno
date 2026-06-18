import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
  inviteToken,
  nickname,
  fromTime,
  toTime,
} = body;

    const supabase = await createSupabaseServerClient();

    const { data: group, error: groupError } = await supabase
      .from("groups")
      .select("*")
      .eq("invite_token", inviteToken)
      .single();

    if (groupError || !group) {
      return NextResponse.json(
        { error: "Grupo no encontrado" },
        { status: 404 }
      );
    }

    const { data: participant, error: participantError } =
      await supabase
        .from("participants")
        .insert({
  group_id: group.id,
  nickname,
  status: "pending",
  automation_stage: "waiting",
  arrival_date: new Date().toISOString().split("T")[0],
  timezone:
    Intl.DateTimeFormat()
      .resolvedOptions()
      .timeZone,
  arrival_from: fromTime,
  arrival_to: toTime,
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
      participant,
      group,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Unexpected error" },
      { status: 500 }
    );
  }
}