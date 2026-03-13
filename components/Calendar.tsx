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
const [selectedService,setSelectedService]=useState<Service|null>(null)
const [selectedTime,setSelectedTime]=useState<string|null>(null)

useEffect(()=>{

const loadServices=async()=>{

const {data:biz}=await supabase
.from("business")
.select("id")
.eq("slug",business)
.single()

if(!biz) return

const {data}=await supabase
.from("services")
.select("id,name,duration")
.eq("business_id",biz.id)

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

function slotBlocked(time:string){

if(!selectedService) return false

const durationSlots=Math.ceil(selectedService.duration/30)

const index=hours.indexOf(time)

for(let i=1;i<durationSlots;i++){

const checkTime=hours[index+i]

if(!checkTime) continue

const appointment=appointments.find(
(a:Appointment)=>getLocalTime(a.start_time)===checkTime
)

if(appointment) return true

}

return false

}

return(

<div className="max-w-sm mx-auto space-y-4">

<select
className="w-full border p-2 rounded"
onChange={(e)=>{

const service=services.find(s=>s.id===e.target.value)

if(service) setSelectedService(service)

}}
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

const blocked=slotBlocked(time)

return(

<div
key={time}
onClick={()=>{

if(!appointment && !blocked){
setSelectedTime(time)
}

}}
className={`flex justify-between px-4 py-3 text-sm ${
appointment || blocked
? "bg-gray-200 text-gray-600"
: "hover:bg-gray-50 cursor-pointer"
}`}
>

<span>{time}</span>

<span>
{appointment || blocked ? "ocupado" : "disponible"}
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