"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"

type Business = {
  id: string
  name: string
  slug: string
  description?: string
  cover_image?: string
  lat: number
  lng: number
}

export default function Page() {

  const [businesses,setBusinesses] = useState<Business[]>([])
  const [selected,setSelected] = useState<Business | null>(null)

  useEffect(()=>{
    load()
  },[])

  const load = async () => {

    const { data } = await supabase
      .from("business")
      .select("*")

    setBusinesses(data || [])
  }

  return (
    <div className="w-full h-screen relative">

      {/* MAPA MOCK (tu mapa actual) */}
      <div className="w-full h-full bg-gray-100 relative">

        {businesses.map(b => (
          <div
            key={b.id}
            onClick={()=>setSelected(b)}
            className="absolute cursor-pointer"
            style={{
              top: `${50 + b.lat}%`,
              left: `${50 + b.lng}%`
            }}
          >
            {/* 🔥 PIN */}
            <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow" />
          </div>
        ))}

      </div>

      {/* 🔥 CARD */}
      {selected && (
        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-xl shadow p-4">

          {/* IMAGEN */}
          {selected.cover_image && (
            <img
              src={selected.cover_image}
              className="w-full h-32 object-cover rounded-lg"
            />
          )}

          <div className="mt-2">

            <div className="font-semibold text-lg">
              {selected.name}
            </div>

            {selected.description && (
              <div className="text-sm text-gray-500 mt-1">
                {selected.description}
              </div>
            )}

            <a
              href={`/book/${selected.slug}`}
              className="block mt-3 bg-green-600 text-white text-center py-2 rounded-lg text-sm"
            >
              Reservar
            </a>

          </div>

        </div>
      )}

    </div>
  )
}