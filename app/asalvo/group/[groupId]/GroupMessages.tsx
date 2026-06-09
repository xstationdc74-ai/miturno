"use client";

import { useEffect, useState } from "react";
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
    <div className="border rounded-lg p-4 flex flex-col gap-2">
      <h3 className="font-semibold">
        Actividad del grupo
      </h3>

      {messages.map((message) => (
        <div
          key={message.id}
          className="text-sm"
        >
          {message.message}
        </div>
      ))}
    </div>
  );
}