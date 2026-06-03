"use client";

import { useState } from "react";

type Props = {
  participantToken: string;
};

export default function ConfirmButton({
  participantToken,
}: Props) {
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleConfirm() {
    setLoading(true);

    const response = await fetch(
      "/api/asalvo/confirm",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          participantToken,
        }),
      }
    );

    setLoading(false);

   if (!response.ok) {
  const error = await response.json();

  console.log(error);

  alert(JSON.stringify(error));

  return;
}

    setConfirmed(true);
  }

  return (
    <button
      onClick={handleConfirm}
      disabled={confirmed || loading}
      className={`border rounded-lg p-4 ${
        confirmed
          ? "opacity-50"
          : ""
      }`}
    >
      {loading
        ? "Confirmando..."
        : confirmed
        ? "Llegada confirmada!"
        : "Llegué!"}
    </button>
  );
}