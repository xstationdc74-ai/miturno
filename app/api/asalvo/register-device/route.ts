import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(
  request: Request
) {
  try {
    const {
      participantToken,
      deviceToken,
      platform,
    } = await request.json();

    if (
      !participantToken ||
      !deviceToken ||
      !platform
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing fields",
        },
        { status: 400 }
      );
    }

    const supabase =
      await createSupabaseServerClient();

    const {
      data: participant,
      error: participantError,
    } = await supabase
      .from("participants")
      .select("id")
      .eq(
        "participant_token",
        participantToken
      )
      .single();

    if (
      participantError ||
      !participant
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Participant not found",
        },
        { status: 404 }
      );
    }

    const { error } = await supabase
      .from("push_devices")
      .insert({
        participant_id:
          participant.id,
        device_token: deviceToken,
        platform,
      });

    if (error) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
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