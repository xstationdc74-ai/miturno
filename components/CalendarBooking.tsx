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

    const today = new Date().toISOString().split("T")[0]

    await createAppointment({
      business_id:businessId,
      service_id:selectedService.id,
      client_name:clientName,
      client_phone:clientPhone,
      start_time:`${today}T${selectedSlot}:00`
    })

    alert("Turno reservado")

    setSelectedSlot(null)
    setClientName("")
    setClientPhone("")

    loadSlots()
  }

  return(

    <div style={{padding:20}}>

      <h2 style={{fontSize:20,fontWeight:600,marginBottom:10}}>
        Elegir horario
      </h2>

      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(4,1fr)",
        gap:10,
        marginBottom:30
      }}>

        {slots.map(h=>{

          const taken = takenSlots.includes(h)

          return(

            <button
              key={h}
              disabled={taken}
              onClick={()=>setSelectedSlot(h)}
              style={{
                padding:10,
                borderRadius:6,
                background:taken
                  ? "#ddd"
                  : selectedSlot===h
                  ? "#111"
                  : "#eee",
                color:taken
                  ? "#666"
                  : selectedSlot===h
                  ? "#fff"
                  : "#000",
                cursor:taken?"not-allowed":"pointer"
              }}
            >
              {taken ? "Ocupado" : h}
            </button>

          )

        })}

      </div>

      <h2 style={{fontSize:20,fontWeight:600,marginBottom:10}}>
        Servicios
      </h2>

      <div style={{
        display:"grid",
        gridTemplateColumns:"repeat(3,1fr)",
        gap:10,
        marginBottom:30
      }}>

        {services.map(s=>(

          <button
            key={s.id}
            onClick={()=>setSelectedService(s)}
            style={{
              padding:10,
              borderRadius:6,
              background:selectedService?.id===s.id
                ? "#111"
                : "#eee",
              color:selectedService?.id===s.id
                ? "#fff"
                : "#000"
            }}
          >
            {s.name} — ${s.price}
          </button>

        ))}

      </div>

      <input
        placeholder="Tu nombre"
        value={clientName}
        onChange={e=>setClientName(e.target.value)}
        style={{
          width:"100%",
          padding:10,
          marginBottom:10
        }}
      />

      <input
        placeholder="Teléfono"
        value={clientPhone}
        onChange={e=>setClientPhone(e.target.value)}
        style={{
          width:"100%",
          padding:10,
          marginBottom:20
        }}
      />

      <button
        onClick={handleBooking}
        style={{
          width:"100%",
          padding:12,
          background:"#111",
          color:"#fff",
          borderRadius:6
        }}
      >
        Reservar turno
      </button>

    </div>

  )

}