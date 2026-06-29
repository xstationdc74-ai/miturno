import { firebaseMessaging } from "@/lib/firebase-admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type SendPushParams = {
  participantId: string;
  title: string;
  body: string;
};

export async function sendPush({
  participantId,
  title,
  body,
}: SendPushParams) {
  const supabase =
    await createSupabaseServerClient();

  const { data: device, error } =
    await supabase
      .from("push_devices")
      .select("device_token")
      .eq(
        "participant_id",
        participantId
      )
      .eq("active", true)
      .order("updated_at", {
        ascending: false,
      })
      .limit(1)
      .single();

  if (error || !device) {
    return {
      success: false,
      error: "No active device",
    };
  }

  const messageId =
    await firebaseMessaging.send({
      token: device.device_token,
      notification: {
        title,
        body,
      },
      webpush: {
        notification: {
          icon: "/icons/icon-192x192.png",
        },
      },
    });

  return {
    success: true,
    messageId,
  };
}