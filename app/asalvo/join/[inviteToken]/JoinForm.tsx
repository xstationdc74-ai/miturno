"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase/client";

type Props = {
  inviteToken: string;
};

export default function JoinForm({
  inviteToken,
}: Props) {
  const router = useRouter();

  const [nickname, setNickname] =
    useState("");

  const [fromTime, setFromTime] =
    useState("22:00");

  const [toTime, setToTime] =
    useState("22:20");

  const [loading, setLoading] =
    useState(false);

  async function handleJoin() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push(
        `/asalvo/login?next=${encodeURIComponent(
          `/asalvo/join/${inviteToken}`
        )}`
      );

      return;
    }

    const response = await fetch(
      "/api/asalvo/join",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          inviteToken,
          nickname,
          fromTime,
          toTime,
        }),
      }
    );

    if (!response.ok) {
      alert("No se pudo unir al grupo");
      setLoading(false);
      return;
    }

    const result =
      await response.json();

    localStorage.setItem(
      "asalvo_participant_token",
      result.participant.participant_token
    );

    router.push(
      `/asalvo/group/${result.group.id}`
    );
  }

  return (
    <div className="flex flex-col gap-4">

      <input
        value={nickname}
        onChange={(e) =>
          setNickname(e.target.value)
        }
        placeholder="Tu nombre"
        className="rounded-xl border p-3"
      />

      <div className="flex gap-2">

        <input
          type="time"
          value={fromTime}
          onChange={(e) =>
            setFromTime(e.target.value)
          }
          className="flex-1 rounded-xl border p-3"
        />

        <input
          type="time"
          value={toTime}
          onChange={(e) =>
            setToTime(e.target.value)
          }
          className="flex-1 rounded-xl border p-3"
        />

      </div>

      <button
        onClick={handleJoin}
        disabled={loading}
        className="rounded-2xl bg-green-600 p-4 text-white"
      >
        {loading
          ? "Uniéndome..."
          : "Unirme"}
      </button>

    </div>
  );
}