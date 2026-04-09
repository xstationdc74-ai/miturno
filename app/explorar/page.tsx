"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import Link from "next/link"

type Business = {
  id: string
  name: string
  slug: string
  description: string
  cover_image: string
  type: string
  cta?: string
}

export default function ExplorarPage() {

  const [businesses, setBusinesses] = useState<Business[]>([])
  const [loading, setLoading] = useState(true)
  const [type, setType] = useState<string | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setType(params.get("type"))
  }, [])

  useEffect(() => {
    fetchBusinesses()
  }, [type])

  const fetchBusinesses = async () => {

    setLoading(true)

    let query = supabase
      .from("business")
      .select("*")
      .eq("is_active", true)

    if (type) {
      query = query.eq("type", type)
    }

    const { data } = await query

    setBusinesses(data || [])
    setLoading(false)
  }

  return (

    <div className="max-w-6xl mx-auto px-4 py-8">

      <h1 className="text-2xl font-semibold mb-6">
        Explorar lugares
      </h1>

      {/* FILTROS */}
      <div className="flex gap-2 flex-wrap mb-6">

        {[
          { label: "Todos", value: null },
          { label: "Barberías", value: "barberia" },
          { label: "Comida", value: "comida" },
          { label: "Arte", value: "arte" },
          { label: "Bienestar", value: "bienestar" },
        ].map(f => {

          const isActive = type === f.value || (!type && f.value === null)

          return (
            <Link
              key={f.label}
              href={f.value ? `/explorar?type=${f.value}` : "/explorar"}
            >
              <button
                className={`px-3 py-1.5 text-sm rounded-lg transition ${
                  isActive
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {f.label}
              </button>
            </Link>
          )
        })}

      </div>

      {loading && (
        <p className="text-sm text-gray-500">Cargando...</p>
      )}

      {/* GRID */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">

        {businesses.map((b) => {

          const isVisit = b.cta === "visit"

          return (
            <Link
              key={b.id}
              href={isVisit ? `/residencias/${b.slug}` : `/book/${b.slug}`}
            >

              <div className="bg-white rounded-xl overflow-hidden border hover:shadow-md transition cursor-pointer">

               <div className="w-full aspect-video bg-gray-100 overflow-hidden">
                  {b.cover_image ? (
                    <img
                      src={b.cover_image}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-xs text-gray-400">
                      Sin imagen
                    </div>
                  )}
                </div>

                <div className="p-4 space-y-2">

                  <div className="font-semibold">
                    {b.name}
                  </div>

                  <div className="text-sm text-gray-500 line-clamp-2">
                    {b.description}
                  </div>

                  <div className="text-xs text-gray-400">
                    {b.type}
                  </div>

                </div>

              </div>

            </Link>
          )
        })}

      </div>

    </div>
  )
}