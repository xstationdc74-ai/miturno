"use client"

import { useState } from "react"
import { useAppointments } from "@/hooks/useAppointments"
import AppointmentModal from "./AppointmentModal"

type Appointment = {
  start_time: string
  client_name: string
}

export default function Calendar({ business }: { business: string }) {

  const today = new Date().toISOString().split("T")[0]

  const [selectedDate,setSelectedDate] = useState(today)

  const { appointments, hours, createAppointment } =
    useAppointments(business, selectedDate)

  const [selectedTime,setSelectedTime] = useState<string | null>(null)

  const handleConfirm = async (name:string)=>{

    if(!selectedTime) return

    await createAppointment(selectedTime,name)

    setSelectedTime(null)

  }

  function getTimeFromDB(dateString:string){

    return dateString.substring(11,16)

  }

  const tomorrow = ()=>{
    const d=new Date()
    d.setDate(d.getDate()+1)
    return d.toISOString().split("T")[0]
  }

  return(

    <div className="max-w-sm mx-auto space-y-4">

      <div className="flex gap-2">

        <button
        onClick={()=>setSelectedDate(today)}
        className="px-3 py-2 border rounded bg-gray-100 hover:bg-gray-200"
        >
        Hoy
        </button>

        <button
        onClick={()=>setSelectedDate(tomorrow())}
        className="px-3 py-2 border rounded bg-gray-100 hover:bg-gray-200"
        >
        Mañana
        </button>

        <input
        type="date"
        min={today}
        className="flex-1 border p-2 rounded"
        value={selectedDate}
        onChange={(e)=>setSelectedDate(e.target.value)}
        />

      </div>

      <div className="divide-y border rounded-lg overflow-hidden bg-white">

        {hours.map((time)=>{

          const appointment=appointments.find(
            (a:Appointment)=>getTimeFromDB(a.start_time)===time
          )

          return(

            <div
            key={time}
            onClick={()=>!appointment && setSelectedTime(time)}
            className={`flex justify-between px-4 py-3 text-sm ${
              appointment
              ? "bg-gray-200 text-gray-600"
              : "hover:bg-gray-50 cursor-pointer"
            }`}
            >

              <span>{time}</span>

              <span>
                {appointment ? "ocupado" : "disponible"}
              </span>

            </div>

          )

        })}

      </div>

      <AppointmentModal
      time={selectedTime || ""}
      open={!!selectedTime}
      onClose={()=>setSelectedTime(null)}
      onConfirm={handleConfirm}
      />

    </div>

  )

}