"use client";

import { useEffect, useState } from "react";

import Card from "@/components/asalvo/ui/Card";

import ConfirmButton from "./ConfirmButton";

import {
  getToken,
  onMessage,
} from "firebase/messaging";

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

  useEffect(() => {
    let unsubscribe:
      | (() => void)
      | undefined;

    async function listenForMessages() {
      const messaging =
        await getMessagingInstance();

      if (!messaging) {
        return;
      }

      unsubscribe = onMessage(
  messaging,
  async (payload) => {
    console.log("🔥 onMessage", payload);

    alert("🔥 onMessage ejecutado");

    const registration =
      await navigator.serviceWorker.ready;

    await registration.showNotification(
      payload.notification?.title ??
        "A Salvo! 🏎️💚",
      {
        body:
          payload.notification?.body ??
          "",
        icon:
          "/icons/icon-192x192.png",
      }
    );
  }
);
    }

    void listenForMessages();

    return () => {
      unsubscribe?.();
    };
  }, []);

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
              deviceToken:
                firebaseToken,
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
        participantToken={
          participantToken
        }
      />
    </Card>
  );
}