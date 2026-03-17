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
  const [total,setTotal] = useState(0)

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

    const { data: sales } = await supabase
      .from("sales")
      .select("amount")
      .eq("business_id", businessId)
      .gte("created_at", `${today}T00:00:00`)
      .lte("created_at", `${today}T23:59:59`)

    const sum = sales?.reduce((acc, s) => acc + s.amount, 0) || 0

    setTotal(sum)
  }

  const handleComplete = async (id: string) => {

    await completeAppointment(id)

    setAppointments(prev =>
      prev.filter(a => a.id !== id)
    )

    loadAppointments()
  }

  return (

    <div className="max-w-3xl mx-auto p-6 space-y-6">

      <div>

        <h2 className="text-xl font-semibold">
          Agenda de hoy
        </h2>

        <p className="text-sm text-gray-500">
          Turnos pendientes
        </p>

      </div>

      <div className="bg-green-600 text-white p-4 rounded-xl flex justify-between items-center">

        <div className="text-sm">
          Total de hoy
        </div>

        <div className="text-lg font-semibold">
          ${total}
        </div>

      </div>

      {appointments.length === 0 && (

        <div className="text-sm text-gray-500 bg-gray-100 p-4 rounded-lg">
          No hay turnos pendientes
        </div>

      )}

      <div className="space-y-3">

        {appointments.map((a) => {

          const time = new Date(a.start_time)
            .toTimeString()
            .slice(0, 5)

          return (

            <div
              key={a.id}
              className="flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-white shadow-sm"
            >

              <div className="space-y-1">

                <div className="text-sm font-semibold">
                  {time} — {a.client_name}
                </div>

                <div className="text-xs text-gray-500">
                  ${a.price_snapshot}
                </div>

              </div>

              <button
                onClick={() => handleComplete(a.id)}
                className="bg-green-600 text-white text-xs px-3 py-1.5 rounded-lg"
              >
                Finalizar
              </button>

            </div>

          )

        })}

      </div>

    </div>

  )

}