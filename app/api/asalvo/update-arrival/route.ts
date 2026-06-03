import { NextResponse } from "next/server";
import { supabaseASalvo } from "@/lib/supabase/asalvo";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      participantToken,
      arrivalFrom,
      arrivalTo,
    } = body;

    const { error } =
      await supabaseASalvo
        .from("participants")
        .update({
          arrival_from: arrivalFrom,
          arrival_to: arrivalTo,
        })
        .eq(
          "participant_token",
          participantToken
        );

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
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