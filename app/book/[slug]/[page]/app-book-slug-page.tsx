"use client"

import { useEffect, useState, use } from "react"
import { supabase } from "@/lib/supabase/client"
import { featureRegistry } from "@/components/features/registry"

type Business = {
  id: string
  name: string
  description?: string
  cover_image?: string
  phone?: string
  features?: any
}

type Hour = {
  day_of_week: number
  open_time: string
  close_time: string
}

type Service = {
  id: string
  name: string
  duration: number
  price: number
}

export default function Page({
  params,
}: {
  params: Promise<{ slug: string; page: string }>
}) {

  // 🔥 FIX NEXT NUEVO
  const { slug, page } = use(params)
  const currentPage = page || "home"

  const [biz,setBiz] = useState<Business | null>(null)
  const [hours,setHours] = useState<Hour[]>([])
  const [services,setServices] = useState<Service[]>([])

  useEffect(()=>{
    if(!slug) return
    loadData()
  },[slug])

  const loadData = async () => {

    const { data: bizData } = await supabase
      .from("business")
      .select("*")
      .eq("slug", slug)
      .single()

    if(!bizData) return

    const parsedBiz = {
      ...bizData,
      features: typeof bizData.features === "string"
        ? JSON.parse(bizData.features)
        : bizData.features
    }

    setBiz(parsedBiz)

    const { data: hoursData } = await supabase
      .from("business_hours")
      .select("*")
      .eq("business_id", bizData.id)

    setHours(hoursData || [])

    const { data: servicesData } = await supabase
      .from("services")
      .select("*")
      .eq("business_id", bizData.id)

    setServices(servicesData || [])
  }

  if (!biz) return <div className="p-10">Cargando...</div>

  

  // 🔥 FEATURES + ORDER DESDE DB

  const featureEntries = Object.entries(biz.features || {})
    .filter(([key, pages]) =>
      key !== "_order" &&
      Array.isArray(pages) &&
      pages.includes(currentPage)
    )

  const order = biz.features?._order

  let activeFeatures: string[]

  if (Array.isArray(order)) {
    activeFeatures = order.filter((key: string) =>
      featureEntries.some(([k]) => k === key)
    )
  } else {
    activeFeatures = featureEntries
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key]) => key)
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">

      {biz.cover_image && (
        <img
          src={biz.cover_image}
          className="w-full h-56 object-contain rounded-xl bg-white"
        />
      )}

      {activeFeatures.map(feature => {
        const Component = featureRegistry[feature]

        if (!Component) {
          console.warn("Feature no registrada:", feature)
          return null
        }

        return (
          <Component
            key={feature}
            businessId={biz.id}
            section={currentPage}
            biz={biz}
            services={services}
            hours={hours}
          />
        )
      })}

      <div>
        <h1 className="text-3xl font-bold">{biz.name}</h1>

        {biz.description && (
          <p className="text-sm text-gray-500 mt-1">
            {biz.description}
          </p>
        )}
      </div>

    </div>
  )
}