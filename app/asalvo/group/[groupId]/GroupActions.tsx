"use client";

import { useEffect, useState } from "react";
import ConfirmButton from "./ConfirmButton";

import { getToken } from "firebase/messaging";
import { getMessagingInstance } from "@/lib/asalvo/messaging";

export default function GroupActions() {
  const [participantToken, setParticipantToken] =
    useState<string | null>(null);

  const [permission, setPermission] =
    useState<string>("default");

  useEffect(() => {
    const token = localStorage.getItem(
      "asalvo_participant_token"
    );

    setParticipantToken(token);

    if (
      typeof window !== "undefined" &&
      "Notification" in window
    ) {
      setPermission(
        Notification.permission
      );
    }
  }, []);

  async function enableNotifications() {
    try {
      const result =
        await Notification.requestPermission();


alert("PERMISSION: " + result);

      setPermission(result);

      console.log(
        "Notification permission:",
        result
      );

      if (result !== "granted") {
        return;
      }

      const messaging =
        await getMessagingInstance();

        alert(
  "MESSAGING: " +
    (messaging ? "OK" : "NULL")
);

      console.log(
        "MESSAGING INSTANCE:",
        messaging
      );

      if (!messaging) {
        console.log(
          "Firebase Messaging no soportado"
        );
        return;
      }

      const firebaseToken =
        await getToken(
          messaging,
          {
            vapidKey:
              "BK1rY6Uuz4wnzAFj1NFMTNlEEfSl75FsUjy9Yrg4H2JpiCfRwudszM8pqkcK8oD3WU5IK9KsP79mWLdlIhE4FUs",
          }
        );

      console.log(
        "FIREBASE TOKEN:",
        firebaseToken
      );

      if (
        !firebaseToken ||
        !participantToken
      ) {
        return;
      }

      const response = await fetch(
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

      const data =
        await response.json();

      console.log(
        "REGISTER DEVICE:",
        data
      );
    } catch (error) {
  console.error(error);
  alert(String(error));
}
  }

  if (!participantToken) {
    return null;
  }

  return (
    <div className="mt-6 flex flex-col gap-4">
      <ConfirmButton
        participantToken={participantToken}
      />

      <button
        onClick={() => {
  alert("CLICK");
  enableNotifications();
}}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        🔔 Activar notificaciones
      </button>

      <p className="text-sm text-center">
        Estado: {permission}
      </p>
    </div>
  );
}