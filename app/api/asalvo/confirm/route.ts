import { NextResponse } from "next/server";
import { supabaseASalvo } from "@/lib/supabase/asalvo";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { participantToken } = body;

    if (!participantToken) {
      return NextResponse.json(
        { error: "participantToken requerido" },
        { status: 400 }
      );
    }

    const { data: participant, error } =
      await supabaseASalvo
        .from("participants")
        .update({
          status: "confirmed",
        })
        .eq("participant_token", participantToken)
        .select()
        .single();
if (error) {
  return NextResponse.json(
    { error: error.message },
    { status: 500 }
  );
}


await supabaseASalvo
  .from("group_messages")
  .insert({
    group_id: participant.group_id,
    message_type: "participant_confirmed",
    message: `${participant.nickname} confirmó llegada.`,
  });

const { data: pendingParticipants } =
  await supabaseASalvo
    .from("participants")
    .select("id")
    .eq("group_id", participant.group_id)
    .eq("status", "pending");

if (
  pendingParticipants &&
  pendingParticipants.length === 0
) {

await supabaseASalvo
  .from("group_messages")
  .insert({
    group_id: participant.group_id,
    message_type: "all_confirmed",
    message: "Todos están A Salvo!",
  });

  const { error: deleteError } =
    await supabaseASalvo
      .from("groups")
      .delete()
      .eq("id", participant.group_id);

  }

    return NextResponse.json({
      success: true,
      participant,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Unexpected error" },
      { status: 500 }
    );
  }
}