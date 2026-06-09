"use client";

import { useEffect, useState } from "react";
import { supabaseASalvo } from "@/lib/supabase/asalvo";

type Participant = {
  id: string;
  nickname: string;
  status: string;
  group_id: string;
  participant_token: string;
  arrival_from: string | null;
  arrival_to: string | null;
  arrival_to_period: string | null;
};

type Props = {
  groupId: string;
};

export default function GroupRealtime({
  groupId,
}: Props) {
  const [participants, setParticipants] = useState<
  Participant[]
>([]);

const [myToken, setMyToken] =
  useState<string | null>(null);

const [editingParticipantId, setEditingParticipantId] =
  useState<string | null>(null);

  const [arrivalFrom, setArrivalFrom] =
  useState("");

  const [arrivalToPeriod, setArrivalToPeriod] =
  useState("PM");

 
const [arrivalTo, setArrivalTo] =
  useState("");

  async function handleSaveArrival(
  participantToken: string
) {
  const response = await fetch(
    "/api/asalvo/update-arrival",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        participantToken,
        arrivalFrom,
        arrivalTo,
      }),
    }
  );

  if (!response.ok) {
    alert(
      "No se pudo actualizar el horario"
    );
    return;
  }

  setEditingParticipantId(null);
}

  useEffect(() => {
  const token = localStorage.getItem(
    "asalvo_participant_token"
  );

  setMyToken(token);
}, []);

useEffect(() => {
  async function loadParticipants() {
    const { data } = await supabaseASalvo
      .from("participants")
      .select("*")
      .eq("group_id", groupId)
      .order("created_at");

    setParticipants(data ?? []);
  }

  loadParticipants();

  const channel = supabaseASalvo
    .channel(`group-${groupId}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "participants",
        filter: `group_id=eq.${groupId}`,
      },
      async () => {
        await loadParticipants();
      }
    )
    .subscribe();

  return () => {
    supabaseASalvo.removeChannel(channel);
  };
}, [groupId]);
  return (
    <div className="flex flex-col gap-3">
      {participants.map((participant) => (
        <div
          key={participant.id}

         className={`border rounded-lg p-3 flex justify-between ${
  participant.status === "confirmed"
    ? "bg-green-100"
    : participant.status === "reminded"
    ? "bg-cyan-100"
    : "bg-yellow-100"
}`}


        >
          <div className="flex flex-col gap-1">
  <span>
    {participant.nickname}

    {participant.participant_token === myToken &&
      " (vos)"}
  </span>

  <span className="text-sm">
    {participant.status === "confirmed"
      ? "Está A Salvo!"
      : participant.status === "reminded"
      ? "Esperamos tu aviso 👋"
      : "Pendiente de confirmación"}
  </span>

  {participant.participant_token === myToken && (
    <>
      <span className="text-xs">
        Tu horario estimado de llegada
      </span>

      <span className="text-sm">
        {participant.arrival_from?.slice(0, 5)}
        {" - "}
        {participant.arrival_to?.slice(0, 5)}
      </span>

      <button
  onClick={() => {
    setEditingParticipantId(
      participant.id
    );

    setArrivalFrom(
      participant.arrival_from?.slice(0, 5) ??
        ""
    );

    setArrivalTo(
      participant.arrival_to?.slice(0, 5) ??
        ""
    );
  }}
  className="text-sm underline text-left"
>
  Actualizar horario estimado de llegada
</button>


{editingParticipantId ===
  participant.id && (
  <div className="flex flex-col gap-2 mt-2">
    <input
  type="time"
  value={arrivalFrom}
  onChange={(e) =>
    setArrivalFrom(e.target.value)
  }
  className="border rounded p-2"
/>

<select
  value={arrivalToPeriod}
  onChange={(e) =>
    setArrivalToPeriod(e.target.value)
  }
  className="border rounded p-2"
>
  <option value="PM">
    Noche (PM)
  </option>

  <option value="AM">
    Madrugada (AM)
  </option>
</select>

    <input
  type="time"
  value={arrivalTo}
  onChange={(e) =>
    setArrivalTo(e.target.value)
  }
  className="border rounded p-2"
/>

   <button
  onClick={() =>
    handleSaveArrival(
      participant.participant_token
    )
  }
  className="border rounded p-2"
>
  Guardar
</button>
  </div>
)}
    </>
  )}
</div>

          <span>

  {participant.status === "confirmed"
    ? "✓"
    : participant.status === "reminded"
    ? "👋"
    : "○"}
</span>
        </div>
      ))}
    </div>
  );
}