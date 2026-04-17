"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import dynamic from "next/dynamic"

const BusinessMap = dynamic(
  () => import("@/components/BusinessMap"),
  { ssr: false }
)
import Link from "next/link"

type Business = {
  id: string
  name: string
  slug: string
  description: string
  cover_image: string
  type: string
  lat: number
  lng: number
  cta?: string
}

export default function MapaPage(){

  const [businesses,setBusinesses] = useState<Business[]>([])
  const [selected,setSelected] = useState<Business | null>(null)

  useEffect(()=>{
    load()
  },[])

  const load = async () => {

  const { data } = await supabase
    .from("business")
    .select("*")

 

  const filtered = (data || []).filter(b => b.is_active === true)

setBusinesses(filtered)
}

  return (
    <div className="relative w-full h-screen">

      {/* MAPA */}
      <BusinessMap
        businesses={businesses}
        onSelect={(b:any)=>setSelected(b)}
      />

      {/* CARD */}
      {selected && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-white rounded-xl shadow-lg overflow-hidden">

          <button
            onClick={()=>setSelected(null)}
            className="absolute right-2 top-2 text-gray-500"
          >
            ✕
          </button>

          <div className="aspect-video bg-gray-100">
            {selected.cover_image && (
              <img
                src={selected.cover_image}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          <div className="p-4 space-y-2">

            <div className="font-semibold text-lg">
              {selected.name}
            </div>

            <div className="text-sm text-gray-500">
              {selected.type}
            </div>

            <div className="text-sm text-gray-600">
              {selected.description}
            </div>

            <Link
              href={
                selected.cta === "visit"
                  ? `/residencias/${selected.slug}`
                  : `/book/${selected.slug}`
              }
            >
              <button className="w-full bg-green-600 text-white py-2 rounded-lg mt-2">
                {selected.cta === "visit" ? "Visitar" : "Reservar"}
              </button>
            </Link>

          </div>

        </div>
      )}

    </div>
  )
}