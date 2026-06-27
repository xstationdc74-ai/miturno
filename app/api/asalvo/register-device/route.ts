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
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        {
          success: false,
          error: "Usuario no autenticado",
        },
        { status: 401 }
      );
    }

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

   const { data: existingDevice } = await supabase
  .from("push_devices")
  .select("id")
  .eq("device_token", deviceToken)
  .maybeSingle();

let error = null;

if (existingDevice) {
  const { error: updateError } = await supabase
    .from("push_devices")
    .update({
      participant_id: participant.id,
      user_id: user.id,
      platform,
      active: true,
      updated_at: new Date().toISOString(),
    })
    .eq("id", existingDevice.id);

  error = updateError;
} else {
  const { error: insertError } = await supabase
    .from("push_devices")
    .insert({
      participant_id: participant.id,
      user_id: user.id,
      device_token: deviceToken,
      platform,
      active: true,
      updated_at: new Date().toISOString(),
    });

  error = insertError;
}

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

  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Unexpected error",
      },
      { status: 500 }
    );
  }
}