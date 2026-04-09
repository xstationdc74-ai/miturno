"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase/client"

type Service = {
  id: string
  name: string
  duration: number
  price: number
}

type Hour = {
  day_of_week: number
  open_time: string
  close_time: string
}

type Props = {
  biz: any
  services: Service[]
  hours: Hour[]
}

export default function Booking({ biz, services, hours }: Props) {

  const [selectedHour,setSelectedHour] = useState<string | null>(null)
  const [selectedService,setSelectedService] = useState<Service | null>(null)
  const [loading,setLoading] = useState(false)
  const [success,setSuccess] = useState(false)

  const [name,setName] = useState("")
  const [phone,setPhone] = useState("")

  return (
    <div className="space-y-4">

      <div className="space-y-2">
        <input
          placeholder="Nombre"
          value={name}
          onChange={e=>setName(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg text-sm"
        />
        <input
          placeholder="Teléfono"
          value={phone}
          onChange={e=>setPhone(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg text-sm"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {services.map(s => (
          <button
            key={s.id}
            onClick={()=>setSelectedService(s)}
            className={`px-3 py-2 rounded-lg text-sm border ${
              selectedService?.id === s.id
                ? "bg-black text-white"
                : ""
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {hours.map(h => {
          const label = `${h.open_time} - ${h.close_time}`
          return (
            <button
              key={h.day_of_week}
              onClick={()=>setSelectedHour(label)}
              className={`px-3 py-2 rounded-lg text-sm border ${
                selectedHour === label
                  ? "bg-black text-white"
                  : ""
              }`}
            >
              {label}
            </button>
          )
        })}
      </div>

      <button
        disabled={loading || success}
        onClick={async () => {

          if(!biz.phone){
            alert("Sin teléfono configurado")
            return
          }

          if(!name || !phone || !selectedService || !selectedHour){
            alert("Completá todos los campos")
            return
          }

          setLoading(true)

          await supabase.from("appointments").insert({
            business_id: biz.id,
            service_id: selectedService.id,
            client_name: name,
            client_phone: phone,
            start_time: new Date().toISOString(),
            status: "pending",
            price_snapshot: selectedService.price
          })

          const url = `https://wa.me/${biz.phone}?text=${encodeURIComponent(
            `Reserva en ${biz.name}
Cliente: ${name}
Tel: ${phone}
Servicio: ${selectedService.name}
Horario: ${selectedHour}`
          )}`

          window.open(url, "_blank")

          setSuccess(true)
          setLoading(false)
        }}
        className="w-full bg-green-600 text-white py-3 rounded-lg"
      >
        {loading ? "Enviando..." : success ? "Reserva enviada ✅" : "Reservar"}
      </button>

    </div>
  )
}