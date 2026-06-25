import { NextResponse } from "next/server";

import { firebaseMessaging } from "@/lib/firebase-admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase =
      await createSupabaseServerClient();

    const { data: device, error } =
      await supabase
        .from("push_devices")
        .select("*")
        .order("created_at", {
          ascending: false,
        })
        .limit(1)
        .single();

    if (error || !device) {
      return NextResponse.json(
        {
          success: false,
          error:
            "No device found",
        },
        { status: 404 }
      );
    }

    const messageId =
  await firebaseMessaging.send({
    token: device.device_token,
    notification: {
      title: "A Salvo! 🏎️💚",
      body: "Prueba Android",
    },
    webpush: {
      notification: {
        icon: "/icons/icon-192x192.png",
      },
    },
  });

    return NextResponse.json({
      success: true,
      messageId,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unexpected error",
      },
      { status: 500 }
    );
  }
}