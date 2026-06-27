"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import AppLayout from "@/components/asalvo/layout/AppLayout";
import Header from "@/components/asalvo/layout/Header";
import Card from "@/components/asalvo/ui/Card";
import Button from "@/components/asalvo/ui/Button";

export default function CreateGroupPage() {
  const router = useRouter();

  const [groupName, setGroupName] = useState("");
  const [nickname, setNickname] = useState("");

  const [fromTime, setFromTime] = useState("22:00");
  const [toTime, setToTime] = useState("22:30");

  const [loading, setLoading] = useState(false);

  async function createGroup() {
    if (!groupName.trim()) {
      alert("Ingresá un nombre para el grupo.");
      return;
    }

    if (!nickname.trim()) {
      alert("Ingresá tu nombre.");
      return;
    }

    setLoading(true);

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

      const data = await response.json();

      if (!response.ok) {
        alert(data.error ?? "No se pudo crear el grupo.");
        return;
      }

      router.push(`/asalvo/group/${data.groupId}`);

    } finally {
      setLoading(false);
    }
  }

  return (
    <AppLayout>

      <Header
        title="Nuevo grupo"
        subtitle="Creá una llegada segura."
      />

      <main className="flex-1 px-5">

        <Card className="space-y-6">

          <div>

            <label className="mb-2 block text-sm font-medium">
              Nombre del grupo
            </label>

            <input
              value={groupName}
              onChange={(e) =>
                setGroupName(e.target.value)
              }
              placeholder="Ej: Viaje a Bariloche"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Tu nombre en el grupo
            </label>

            <input
              value={nickname}
              onChange={(e) =>
                setNickname(e.target.value)
              }
              placeholder="Ej: Diego"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-500"
            />

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>

              <label className="mb-2 block text-sm font-medium">
                Desde
              </label>

              <input
                type="time"
                value={fromTime}
                onChange={(e) =>
                  setFromTime(e.target.value)
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-3"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm font-medium">
                Hasta
              </label>

              <input
                type="time"
                value={toTime}
                onChange={(e) =>
                  setToTime(e.target.value)
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-3"
              />

            </div>

          </div>

          <Button
            fullWidth
            onClick={createGroup}
            disabled={loading}
          >
            {loading
              ? "Creando..."
              : "Crear grupo"}
          </Button>

        </Card>

      </main>

    </AppLayout>
  );
}