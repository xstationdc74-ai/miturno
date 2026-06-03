"use client";

import { useEffect, useState } from "react";
import ConfirmButton from "./ConfirmButton";

export default function GroupActions() {
  const [participantToken, setParticipantToken] =
    useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem(
      "asalvo_participant_token"
    );

    setParticipantToken(token);
  }, []);

  if (!participantToken) {
    return null;
  }

  return (
    <div className="mt-6">
      <ConfirmButton
        participantToken={participantToken}
      />
    </div>
  );
}