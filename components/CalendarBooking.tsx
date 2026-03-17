'use client'

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { useAppointments } from "@/hooks/useAppointments"

type Service = {
  id: string
  name: string
  duration: number
  price: number
}

export default function CalendarBooking({
  businessId
}:{
  businessId:string
}){

  const { createAppointment } = useAppointments()

  const [services,setServices] = useState<Service[]>([])
  const [selectedService,setSelectedService] = useState<Service | null>(null)

  const [slots,setSlots] = useState<string[]>([])
  const [takenSlots,setTakenSlots] = useState<string[]>([])
  const [selectedSlot,setSelectedSlot] = useState<string | null>(null)

  const [places,setPlaces] = useState<number>(1)

  const [clientName,setClientName] = useState("")
  const [clientPhone,setClientPhone] = useState("")

  const [confirmed,setConfirmed] = useState<any>(null)
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
    loadServices()
    loadSlots()
  },[])

  const loadServices = async () => {

    const { data } = await supabase
      .from("services")
      .select("*")
      .eq("business_id",businessId)

    setServices(data || [])
  }

  const loadSlots = async () => {

    const today = new Date()
    const day = today.getDay()

    const { data:business } = await supabase
      .from("business")
      .select("places")
      .eq("id",businessId)
      .single()

    const capacity = business?.places || 1
    setPlaces(capacity)

    const { data:hours } = await supabase
      .from("business_hours")
      .select("*")
      .eq("business_id",businessId)
      .eq("day_of_week",day)
      .single()

    if(!hours) return

    const open = hours.open_time
    const close = hours.close_time

    const start = new Date(`1970-01-01T${open}`)
    const end = new Date(`1970-01-01T${close}`)

    const generated:string[] = []

    let current = start

    while(current < end){

      const h = current.getHours().toString().padStart(2,"0")
      const m = current.getMinutes().toString().padStart(2,"0")

      generated.push(`${h}:${m}`)

      current = new Date(current.getTime() + 20 * 60000)
    }

    const todayStr = today.toISOString().split("T")[0]

    const { data:appointments } = await supabase
      .from("appointments")
      .select("start_time,status")
      .eq("business_id",businessId)
      .eq("status","booked")
      .gte("start_time",`${todayStr}T00:00:00`)
      .lte("start_time",`${todayStr}T23:59:59`)

    const countPerSlot:Record<string,number> = {}

    appointments?.forEach(a=>{
      const time = new Date(a.start_time).toTimeString().slice(0,5)
      countPerSlot[time] = (countPerSlot[time] || 0) + 1
    })

    const taken:string[] = []

    generated.forEach(slot=>{
      if((countPerSlot[slot] || 0) >= capacity){
        taken.push(slot)
      }
    })

    setSlots(generated)
    setTakenSlots(taken)
  }

  const handleBooking = async () => {

    if(!selectedService || !selectedSlot) return

    setLoading(true)

    const today = new Date().toISOString().split("T")[0]

    await createAppointment({
      business_id:businessId,
      service_id:selectedService.id,
      client_name:clientName,
      client_phone:clientPhone,
      start_time:`${today}T${selectedSlot}:00`
    })

    setConfirmed({
      service:selectedService,
      slot:selectedSlot,
      name:clientName
    })

    setLoading(false)
  }

  // 🔥 CONFIRMACIÓN
if(confirmed){

  const today = new Date().toISOString().split("T")[0]
  const start = `${today}T${confirmed.slot}:00`

  const startDate = new Date(start)
  const endDate = new Date(startDate.getTime() + confirmed.service.duration * 60000)

  const formatDate = (d: Date) =>
    d.toISOString().replace(/[-:]/g,"").split(".")[0]

  const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    confirmed.service.name
  )}&dates=${formatDate(startDate)}/${formatDate(endDate)}`

  const message = encodeURIComponent(
    `Hola ${confirmed.name}, tu turno fue confirmado.\n\nServicio: ${confirmed.service.name}\nHorario: ${confirmed.slot}\n\nGracias por elegirnos 🙌`
  )

  const phone = clientPhone.replace(/\D/g,"")
  const whatsappUrl = `https://wa.me/${phone}?text=${message}`

  return(

    <div className="flex flex-col items-center justify-center text-center py-10 space-y-4">

      <div className="text-4xl">✅</div>

      <h2 className="text-lg font-semibold">
        Turno confirmado
      </h2>

      <div className="text-sm text-gray-600 space-y-1">

        <div>{confirmed.service.name}</div>
        <div>{confirmed.slot}</div>
        <div>{confirmed.name}</div>

      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg text-sm"
      >
        Enviar por WhatsApp
      </a>

      <a
        href={calendarUrl}
        target="_blank"
        className="bg-gray-100 px-4 py-2 rounded-lg text-sm"
      >
        Agregar a mi calendario
      </a>

      <button
        onClick={()=>window.location.reload()}
        className="text-sm text-gray-500"
      >
        Reservar otro turno
      </button>

    </div>

  )

}

  return(

    <div className="space-y-6">

      {/* HORARIOS */}
      <div>

        <h2 className="text-sm font-semibold mb-3">
          Horarios disponibles
        </h2>

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">

          {slots.map(h=>{

            const taken = takenSlots.includes(h)
            const selected = selectedSlot === h

            return(

              <button
                key={h}
                disabled={taken}
                onClick={()=>setSelectedSlot(h)}
                className={`
                  h-10 rounded-lg text-sm transition
                  ${taken
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : selected
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                  }
                `}
              >
                {taken ? "—" : h}
              </button>

            )

          })}

        </div>

      </div>

      {/* SERVICIOS */}
      <div>

        <h2 className="text-sm font-semibold mb-3">
          Servicios
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">

          {services.map(s=>{

            const selected = selectedService?.id === s.id

            return(

              <button
                key={s.id}
                onClick={()=>setSelectedService(s)}
                className={`
                  text-left p-3 rounded-lg border transition
                  ${selected
                    ? "border-green-600 bg-green-50"
                    : "border-gray-200 hover:border-gray-300"
                  }
                `}
              >
                <div className="font-medium text-sm">
                  {s.name}
                </div>

                <div className="text-xs text-gray-500">
                  ${s.price} • {s.duration} min
                </div>

              </button>

            )

          })}

        </div>

      </div>

      {/* FORM */}
      <div className="space-y-3">

        <input
          placeholder="Tu nombre"
          value={clientName}
          onChange={e=>setClientName(e.target.value)}
          className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm"
        />

        <input
          placeholder="Teléfono"
          value={clientPhone}
          onChange={e=>setClientPhone(e.target.value)}
          className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm"
        />

      </div>

      {/* CTA */}
      <button
        onClick={handleBooking}
        disabled={!selectedService || !selectedSlot || loading}
        className={`
          w-full h-11 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2
          ${selectedService && selectedSlot
            ? "bg-green-600 text-white"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }
        `}
      >

        {loading && (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        )}

        {loading ? "Reservando..." : "Confirmar turno"}

      </button>

    </div>

  )

}