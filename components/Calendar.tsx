"use client"

import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"
import { useAppointments } from "@/hooks/useAppointments"
import AppointmentModal from "./AppointmentModal"

const supabase = createClient(
process.env.NEXT_PUBLIC_SUPABASE_URL!,
process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Appointment = {
start_time:string
client_name:string
}

type Service = {
id:string
name:string
duration:number
}

export default function Calendar({business}:{business:string}){

const {appointments,hours,createAppointment}=useAppointments(business)

const [services,setServices]=useState<Service[]>([])
const [selectedService,setSelectedService]=useState<string>("")
const [selectedTime,setSelectedTime]=useState<string|null>(null)

useEffect(()=>{

const loadServices=async()=>{

const {data}=await supabase
.from("services")
.select("id,name,duration")

if(data) setServices(data)

}

loadServices()

},[])

const handleConfirm=async(name:string)=>{

if(!selectedTime) return

await createAppointment(selectedTime,name)

setSelectedTime(null)

}

function getLocalTime(dateString:string){

const d=new Date(dateString)

const h=d.getHours().toString().padStart(2,"0")
const m=d.getMinutes().toString().padStart(2,"0")

return `${h}:${m}`

}

return(

<div className="max-w-sm mx-auto space-y-4">

<select
className="w-full border p-2 rounded"
value={selectedService}
onChange={(e)=>setSelectedService(e.target.value)}
>

<option value="">Seleccionar servicio</option>

{services.map(s=>(
<option key={s.id} value={s.id}>
{s.name}
</option>
))}

</select>

<div className="divide-y border rounded-lg overflow-hidden bg-white">

{hours.map((time)=>{

const appointment=appointments.find(
(a:Appointment)=>getLocalTime(a.start_time)===time
)

return(

<div
key={time}
onClick={()=>!appointment && selectedService && setSelectedTime(time)}
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