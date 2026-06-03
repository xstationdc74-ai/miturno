import { NextResponse } from "next/server";
import { supabaseASalvo } from "@/lib/supabase/asalvo";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { groupId } = body;

    const { data: participants } =
      await supabaseASalvo
        .from("participants")
        .select("*")
        .eq("group_id", groupId)
        .eq("status", "pending");

    await supabaseASalvo
      .from("participants")
      .update({
        status: "reminded",
      })
      .eq("group_id", groupId)
      .eq("status", "pending");

    for (const participant of participants ?? []) {
      await supabaseASalvo
        .from("group_messages")
        .insert({
          group_id: groupId,
          message_type:
            "participant_reminded",
          message:
            `Esperamos el aviso de ${participant.nickname} 👋`,
        });
    }

    return NextResponse.json({
      success: true,
    });
  } catch {
    return NextResponse.json(
      { error: "Unexpected error" },
      { status: 500 }
    );
  }
}