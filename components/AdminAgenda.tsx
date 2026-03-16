'use client'

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { useAppointments } from "@/hooks/useAppointments"

type Appointment = {
  id: string
  client_name: string
  start_time: string
  status: string
  price_snapshot: number
}

export default function AdminAgenda({ businessId }: { businessId: string }) {

  const [appointments, setAppointments] = useState<Appointment[]>([])
  const { completeAppointment } = useAppointments()

  useEffect(() => {
    loadAppointments()
  }, [])

  const loadAppointments = async () => {

    const today = new Date().toISOString().split("T")[0]

    const { data } = await supabase
      .from("appointments")
      .select("*")
      .eq("business_id", businessId)
      .eq("status","booked")
      .gte("start_time", `${today}T00:00:00`)
      .lte("start_time", `${today}T23:59:59`)
      .order("start_time")

    setAppointments(data || [])
  }

  const handleComplete = async (id: string) => {

    await completeAppointment(id)

    setAppointments(prev =>
      prev.filter(a => a.id !== id)
    )
  }

  return (
    <div style={{ padding: 20 }}>

      <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 20 }}>
        Agenda de hoy
      </h2>

      {appointments.length === 0 && (
        <div style={{ color: "#666" }}>
          No hay turnos pendientes
        </div>
      )}

      {appointments.map((a) => {

        const time = new Date(a.start_time)
          .toTimeString()
          .slice(0, 5)

        return (
          <div
            key={a.id}
            style={{
              border: "1px solid #ddd",
              padding: 12,
              borderRadius: 6,
              marginBottom: 10,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >

            <div>

              <div style={{ fontWeight: 600 }}>
                {time} — {a.client_name}
              </div>

              <div style={{ fontSize: 13, color: "#666" }}>
                ${a.price_snapshot}
              </div>

            </div>

            <button
              onClick={() => handleComplete(a.id)}
              style={{
                padding: "6px 12px",
                background: "#111",
                color: "#fff",
                borderRadius: 4,
                cursor: "pointer"
              }}
            >
              Finalizar
            </button>

          </div>
        )
      })}
    </div>
  )
}