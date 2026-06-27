"use client";

import { useEffect, useState } from "react";

import Card from "@/components/asalvo/ui/Card";

import { supabaseASalvo } from "@/lib/supabase/asalvo";

type Message = {
  id: string;
  message: string;
  created_at: string;
};

type Props = {
  groupId: string;
};

export default function GroupMessages({
  groupId,
}: Props) {
  const [messages, setMessages] = useState<
    Message[]
  >([]);

  useEffect(() => {
    async function loadMessages() {
      const { data } = await supabaseASalvo
        .from("group_messages")
        .select("*")
        .eq("group_id", groupId)
        .order("created_at", {
          ascending: false,
        });

      setMessages(data ?? []);
    }

    loadMessages();

    const channel = supabaseASalvo
      .channel(`messages-${groupId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "group_messages",
          filter: `group_id=eq.${groupId}`,
        },
        async () => {
          await loadMessages();
        }
      )
      .subscribe();

    return () => {
      supabaseASalvo.removeChannel(
        channel
      );
    };
  }, [groupId]);

  return (
    <Card>

      <h3 className="mb-4 text-lg font-bold">
        Actividad
      </h3>

      <div className="space-y-3">

        {messages.length === 0 && (
          <p className="text-sm text-slate-500">
            Todavía no hay actividad.
          </p>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700"
          >
            {message.message}
          </div>
        ))}

      </div>

    </Card>
  );
}