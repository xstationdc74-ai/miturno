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
  type: string
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
     .eq("is_active", true)

    setBusinesses(data || [])
  }

 const getCTA = (b: any) => {
  if (b.cta === "visit") {
    return {
      label: "Visitar",
      href: `/residencias/${b.slug}`
    }
  }

  return {
    label: "Reservar",
    href: `/book/${b.slug}`
  }
}
console.log("SELECTED:", selected)
  return (
    <div className="w-full h-screen relative">

      {/* MAPA */}
      <div className="w-full h-full bg-gray-100 relative">

        {businesses.map(b => (
          <div
            key={b.id}
            onClick={()=>{
  console.log("CLICK BUSINESS:", b)
  setSelected(b)
}}
            className="absolute cursor-pointer"
            style={{
              top: `${50 + b.lat}%`,
              left: `${50 + b.lng}%`
            }}
          >
            <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow" />
          </div>
        ))}

      </div>

      {/* CARD */}
      {selected && (
        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-xl shadow p-4 space-y-3">

          {/* 🔥 C421 SPECIAL */}
          {selected.type === "c421" ? (
            <div className="text-center space-y-2">

              <img
                src="/c421-logo.png"
                className="mx-auto w-16 opacity-90"
              />

             <div className="text-sm text-gray-500">
             {selected.type}
             </div>

            </div>
          ) : (
            <>
              {selected.cover_image && (
 <div className="w-full aspect-video overflow-hidden rounded-lg">
    <img
      src={selected.cover_image}
      className="w-full h-full object-cover"
    />
  </div>
)}

              <div>
                <div className="font-semibold text-lg">
                  {selected.name}
                </div>

                {selected.description && (
                  <div className="text-sm text-gray-500 mt-1">
                    {selected.description}
                  </div>
                )}
              </div>
            </>
          )}

          {/* CTA */}
          <a
            href={getCTA(selected).href}
            className="block bg-green-600 text-white text-center py-2 rounded-lg text-sm"
          >
            {getCTA(selected).label}
          </a>

        </div>
      )}

    </div>
  )
}