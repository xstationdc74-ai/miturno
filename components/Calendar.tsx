// components/Calendar.tsx

"use client"

import { useState } from "react"
import { useAppointments } from "@/hooks/useAppointments"
import AppointmentModal from "./AppointmentModal"

type Appointment = {
  id?: string
  start_time: string
  client_name: string
}

export default function Calendar({ business }: { business: string }) {

  const { appointments, createAppointment } = useAppointments(business)

  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const hours = [
    "09:00","09:30","10:00","10:30","11:00","11:30",
    "12:00","12:30","13:00","13:30","14:00","14:30",
    "15:00","15:30","16:00","16:30","17:00","17:30"
  ]

  const handleConfirm = async (name: string) => {
    if (!selectedTime) return
    await createAppointment(selectedTime, name)
    setSelectedTime(null)
  }

  function getLocalTime(dateString: string) {
    const date = new Date(dateString)

    const h = date.getHours().toString().padStart(2,"0")
    const m = date.getMinutes().toString().padStart(2,"0")

    return `${h}:${m}`
  }

  return (
    <div className="max-w-sm mx-auto divide-y border rounded-lg overflow-hidden bg-white">

      {hours.map((time) => {

        const appointment = appointments.find(
          (a: Appointment) => getLocalTime(a.start_time) === time
        )

        return (
          <div
            key={time}
            onClick={() => !appointment && setSelectedTime(time)}
            className={`flex items-center justify-between px-4 py-3 text-sm ${
              appointment
                ? "bg-red-50 text-red-700 cursor-not-allowed"
                : "hover:bg-gray-50 cursor-pointer"
            }`}
          >
            <span className="font-medium">{time}</span>

            {appointment && (
              <span className="text-gray-700">{appointment.client_name}</span>
            )}

          </div>
        )
      })}

      <AppointmentModal
        time={selectedTime || ""}
        open={!!selectedTime}
        onClose={() => setSelectedTime(null)}
        onConfirm={handleConfirm}
      />

    </div>
  )
}