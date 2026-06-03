"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  inviteToken: string;
};

export default function JoinForm({
  inviteToken,
}: Props) {
  const [nickname, setNickname] = useState("");

const [fromTime, setFromTime] =
  useState("22:00");

const [toTime, setToTime] =
  useState("22:20");
  const [joined, setJoined] = useState(false);

  const router = useRouter();

  async function handleJoin() {
    console.log("CLICK JOIN");

    const response = await fetch("/api/asalvo/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
  inviteToken,
  nickname,
  fromTime,
  toTime,
}),
    });

    if (!response.ok) {
      alert("No se pudo unir al grupo");
      return;
    }

   const result = await response.json();
   
        localStorage.setItem(
        "asalvo_participant_token",
        result.participant.participant_token
          );
   router.push(`/asalvo/group/${result.group.id}`); 

  }

  if (joined) {
    return (
      <div className="flex flex-col gap-4 text-center">
        <h2 className="text-2xl font-semibold">
          Listo!
        </h2>

        <p>
          Ya formas parte del grupo.
        </p>

        <p>
          Ahora sólo queda disfrutar la experiencia.
          Yo me ocuparé de los horarios y los avisos.
        </p>

        <p>
          Nos vemos para la próxima experiencia.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <input
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="Tu nickname"
        className="border rounded-lg p-3"
      />

<div className="flex gap-2">
  <input
    type="time"
    value={fromTime}
    onChange={(e) =>
      setFromTime(e.target.value)
    }
    className="border rounded-lg p-3 flex-1"
  />

  <input
    type="time"
    value={toTime}
    onChange={(e) =>
      setToTime(e.target.value)
    }
    className="border rounded-lg p-3 flex-1"
  />
</div>

      <button
        onClick={handleJoin}
        className="border rounded-lg p-4"
      >
        Unirme
      </button>
    </div>
  );
}