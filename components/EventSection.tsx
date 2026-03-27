'use client'

import { useState } from "react"
import { supabase } from "@/lib/supabase/client"

export default function EventSection({ businessId }: { businessId: string }) {

  const [name,setName] = useState("")
  const [price,setPrice] = useState("")
  const [capacity,setCapacity] = useState("")

  const [startDate,setStartDate] = useState("")
  const [startTime,setStartTime] = useState("10:00")

  const [endDate,setEndDate] = useState("")
  const [endTime,setEndTime] = useState("18:00")

  const createEvent = async () => {

    console.log("CREATE EVENT RUNNING")

    if(!name || !price || !capacity || !startDate || !endDate){
      alert("Faltan datos")
      return
    }

    const start = `${startDate}T${startTime}`
    const end = `${endDate}T${endTime}`

    const { data, error } = await supabase
      .from("events")
      .insert({
        business_id: businessId,
        name,
        price: Number(price),
        capacity: Number(capacity),
        date: start,
        end_date: end
      })
      .select()
      .single()

    if(error){
      console.error(error)
      alert("Error al crear evento")
      return
    }

    if(data){
      alert("Evento creado")

      setName("")
      setPrice("")
      setCapacity("")
      setStartDate("")
      setEndDate("")
    }
  }

  return (

    <div className="bg-white p-4 rounded-xl border space-y-3">

      <h2 className="text-sm font-semibold">
        Eventos / Residencias
      </h2>

      <input
        placeholder="Nombre del evento"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        className="w-full border px-3 py-2 rounded text-sm"
      />

      <input
        placeholder="Precio"
        value={price}
        onChange={(e)=>setPrice(e.target.value)}
        className="w-full border px-3 py-2 rounded text-sm"
      />

      <input
        placeholder="Capacidad"
        value={capacity}
        onChange={(e)=>setCapacity(e.target.value)}
        className="w-full border px-3 py-2 rounded text-sm"
      />

      {/* INICIO */}
      <div className="grid grid-cols-2 gap-2">
        <input
          type="date"
          value={startDate}
          onChange={(e)=>setStartDate(e.target.value)}
          className="border px-3 py-2 rounded text-sm"
        />

        <input
          type="time"
          value={startTime}
          onChange={(e)=>setStartTime(e.target.value)}
          className="border px-3 py-2 rounded text-sm"
        />
      </div>

      {/* FIN */}
      <div className="grid grid-cols-2 gap-2">
        <input
          type="date"
          value={endDate}
          onChange={(e)=>setEndDate(e.target.value)}
          className="border px-3 py-2 rounded text-sm"
        />

        <input
          type="time"
          value={endTime}
          onChange={(e)=>setEndTime(e.target.value)}
          className="border px-3 py-2 rounded text-sm"
        />
      </div>

      <button
        onClick={createEvent}
        className="w-full bg-green-600 text-white py-2 rounded-lg text-sm"
      >
        Crear evento
      </button>

    </div>
  )
}