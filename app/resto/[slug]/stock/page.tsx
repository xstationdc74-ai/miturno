"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import AdminRestaurant from "@/components/AdminRestaurant"
import CashSummary from "@/components/CashSummary"
import { useParams } from "next/navigation"

type Business = {
  id: string
  name: string
  slug: string
}

export default function Page() {

  const params = useParams()
  const slug = typeof params.slug === "string" ? params.slug : undefined

  const [biz,setBiz] = useState<Business | null>(null)

  useEffect(()=>{
    if(!slug) return
    loadData()
  },[slug])

  const loadData = async () => {

    const { data } = await supabase
      .from("business")
      .select("*")
      .eq("slug", slug)
      .single()

    if(data){
      setBiz(data)
    }
  }

  if (!biz) return <div className="p-10">Cargando...</div>

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">

      <div>
        <h1 className="text-2xl font-semibold">
          {biz.name}
        </h1>

        <div className="text-sm text-gray-500">
          Modo mesera
        </div>
      </div>

      <CashSummary businessId={biz.id} />

      <AdminRestaurant
        businessId={biz.id}
        slug={biz.slug}
      />

    </div>
  )
}