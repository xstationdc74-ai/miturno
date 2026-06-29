"use client";

import { useEffect, useState } from "react";

import Card from "@/components/asalvo/ui/Card";

import ConfirmButton from "./ConfirmButton";

import { getToken } from "firebase/messaging";
import { getMessagingInstance } from "@/lib/asalvo/messaging";

export default function GroupActions() {
  const [participantToken, setParticipantToken] =
    useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem(
      "asalvo_participant_token"
    );

    setParticipantToken(token);
  }, []);

  useEffect(() => {
    if (!participantToken) {
      return;
    }

    void enableNotifications();
  }, [participantToken]);

  async function enableNotifications(): Promise<boolean> {
    try {
      const result =
        await Notification.requestPermission();

      if (result !== "granted") {
        return false;
      }

      const messaging =
        await getMessagingInstance();

      if (!messaging) {
        return false;
      }

      const registrations =
        await navigator.serviceWorker.getRegistrations();

      const firebaseToken =
        await getToken(messaging, {
          vapidKey:
            "BK1rY6Uuz4wnzAFj1NFMTNlEEfSl75FsUjy9Yrg4H2JpiCfRwudszM8pqkcK8oD3WU5IK9KsP79mWLdlIhE4FUs",
          serviceWorkerRegistration:
            registrations[0],
        });

await navigator.clipboard.writeText(firebaseToken);

alert("Token copiado al portapapeles");

      if (
        !firebaseToken ||
        !participantToken
      ) {
        return false;
      }

      const response =
        await fetch(
          "/api/asalvo/register-device",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              participantToken,
              deviceToken: firebaseToken,
              platform: "web",
            }),
          }
        );

      return response.ok;

    } catch {
      return false;
    }
  }

  if (!participantToken) {
    return null;
  }

  return (
    <Card className="space-y-4">
      <ConfirmButton
        participantToken={participantToken}
      />
    </Card>
  );
}