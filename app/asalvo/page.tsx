"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ASalvoPage() {
  const [groupName, setGroupName] = useState("Bosque Verde");
  const [nickname, setNickname] = useState("Chicolisto");
  const [fromTime, setFromTime] = useState("22:00");
  const [toTime, setToTime] = useState("22:20");
  const router = useRouter();

  const [shareLink, setShareLink] = useState("");

  async function handleCreateGroup() {
  try {
    const response = await fetch("/api/asalvo/groups", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
  groupName,
  nickname,
  fromTime,
  toTime,
}),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error);
    }

    localStorage.setItem(
  "asalvo_participant_token",
  result.participantToken
);

    router.push(
  `/asalvo/group/${result.groupId}`
);

  } catch (error) {
    console.error(error);
    alert("No se pudo crear el grupo");
  }
}

  async function handleShare() {
    if (!shareLink) return;

    if (navigator.share) {
      await navigator.share({
        title: "A Salvo!",
        text: `Te invito a un grupo de A Salvo!`,
        url: shareLink,
      });

      return;
    }

    await navigator.clipboard.writeText(shareLink);
    alert("Link copiado!");
  }

  return (
    <main className="min-h-screen max-w-md mx-auto p-6 flex flex-col gap-6">
      <h1 className="text-4xl font-bold text-center">
        A Salvo!
      </h1>

      <div className="flex flex-col gap-2">
        <label>Grupo</label>

        <input
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="border rounded-lg p-3"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label>Nickname</label>

        <input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="border rounded-lg p-3"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label>Rango de llegada</label>

        <div className="flex gap-2">
          <input
            type="time"
            value={fromTime}
            onChange={(e) => setFromTime(e.target.value)}
            className="border rounded-lg p-3 flex-1"
          />

          <input
            type="time"
            value={toTime}
            onChange={(e) => setToTime(e.target.value)}
            className="border rounded-lg p-3 flex-1"
          />
        </div>
      </div>

      <button
        onClick={handleCreateGroup}
        className="border rounded-lg p-4"
      >
        Crear grupo
      </button>

      {shareLink && (
        <div className="flex flex-col gap-3">
          <p className="text-sm break-all">
            {shareLink}
          </p>

          <button
            onClick={handleShare}
            className="border rounded-lg p-4"
          >
            Compartir
          </button>
        </div>
      )}
    </main>
  );
}