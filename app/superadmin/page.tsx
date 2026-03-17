'use client'

import { useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function SuperAdminPage(){

  const router = useRouter()

  const [name,setName] = useState("")
  const [slug,setSlug] = useState("")
  const [type,setType] = useState("")
  const [hasBooking,setHasBooking] = useState(true)
  const [hasGallery,setHasGallery] = useState(false)
  const [loading,setLoading] = useState(false)

  const handleCreate = async () => {

    if(!name || !slug) return alert("Faltan datos")

    setLoading(true)

    const { error } = await supabase
      .from("business")
      .insert({
        name,
        slug,
        type,
        places: 1,
        has_booking: hasBooking,
        has_gallery: hasGallery,
      })

    setLoading(false)

    if(error){
      console.error(error)
      return alert("Error al crear negocio")
    }

    alert("Negocio creado")

    // 👉 ir directo al admin del negocio
    router.push(`/admin/${slug}`)
  }

  return(

    <div className="max-w-xl mx-auto p-6 space-y-6">

      <h1 className="text-xl font-semibold">
        SuperAdmin — Crear negocio
      </h1>

      {/* NAME */}
      <input
        placeholder="Nombre del negocio"
        value={name}
        onChange={e=>setName(e.target.value)}
        className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm"
      />

      {/* SLUG */}
      <input
        placeholder="slug (ej: barberia-diegui)"
        value={slug}
        onChange={e=>setSlug(e.target.value)}
        className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm"
      />

      {/* TYPE */}
      <input
        placeholder="tipo (barberia, yoga, arte...)"
        value={type}
        onChange={e=>setType(e.target.value)}
        className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm"
      />

      {/* FEATURES */}
      <div className="space-y-2 text-sm">

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={hasBooking}
            onChange={()=>setHasBooking(!hasBooking)}
          />
          Tiene reservas
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={hasGallery}
            onChange={()=>setHasGallery(!hasGallery)}
          />
          Tiene galería
        </label>

      </div>

      {/* CTA */}
      <button
        onClick={handleCreate}
        disabled={loading}
        className="w-full h-11 bg-green-600 text-white rounded-lg text-sm"
      >
        {loading ? "Creando..." : "Crear negocio"}
      </button>

    </div>

  )

}