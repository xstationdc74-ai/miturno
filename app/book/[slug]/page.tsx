'use client'

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import BusinessHero from "@/components/BusinessHero"
import CalendarBooking from "@/components/CalendarBooking"
import Gallery from "@/components/Gallery"
import { useParams } from "next/navigation"

export default function Page() {

  const params = useParams()
  const slug = params.slug as string

  const [biz,setBiz] = useState<any>(null)

  useEffect(()=>{
    load()
  },[slug])

  const load = async () => {

    const { data } = await supabase
      .from("business")
      .select("*")
      .eq("slug", slug)
      .single()

    setBiz(data)
  }

  if(!biz){
    return <div className="p-10">Cargando...</div>
  }

  return (

    <div className="max-w-5xl mx-auto">

      <BusinessHero business={biz} />

      <div className="p-6">
        <Gallery businessId={biz.id} />
      </div>

      <div className="p-6">
        <CalendarBooking businessId={biz.id} />
      </div>

    </div>

  )

}