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

    const supabase = await createSupabaseServerClient();

    const { data: group, error: groupError } = await supabase
      .from("groups")
.insert({
  name: groupName,
  status: "active",
  arrival_from: fromTime,
  arrival_to: toTime,
})
      .select()
      .single();

    if (groupError) {
      return NextResponse.json(
        { error: groupError.message },
        { status: 500 }
      );
    }

    const { data: participant, error: participantError,} = await supabase

  .from("participants")
.insert({
  group_id: group.id,
  nickname,
  status: "pending",
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
  inviteToken: group.invite_token,
  groupId: group.id,
  participantToken:
    participant.participant_token,
});


  } catch (error) {
    return NextResponse.json(
      { error: "Unexpected error" },
      { status: 500 }
    );
  }
}