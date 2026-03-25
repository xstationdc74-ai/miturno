'use client'

import { useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function SuperAdminPage(){

  const router = useRouter()

  const [name,setName] = useState("")
  const [slug,setSlug] = useState("")
  const [type,setType] = useState("")

  const [lat,setLat] = useState("")
  const [lng,setLng] = useState("")

  const [coverImage,setCoverImage] = useState("")

  const [hasBooking,setHasBooking] = useState(true)
  const [hasGallery,setHasGallery] = useState(false)
  const [isActive,setIsActive] = useState(true)

  const [gallerySections,setGallerySections] = useState<string[]>([])

  const [loading,setLoading] = useState(false)

  const toggleSection = (section:string) => {

    if(gallerySections.includes(section)){
      setGallerySections(prev => prev.filter(s => s !== section))
    }else{
      setGallerySections(prev => [...prev, section])
    }

  }

  const handleCreate = async () => {

    if(!name || !slug) return alert("Faltan datos")

    setLoading(true)

    const { error } = await supabase
      .from("business")
      .insert({
        name,
        slug,
        type,
        lat: lat ? parseFloat(lat) : null,
        lng: lng ? parseFloat(lng) : null,
        cover_image: coverImage || null,
        places: 1,
        has_booking: hasBooking,
        has_gallery: hasGallery,
        is_active: isActive,
        gallery_sections: gallerySections.length ? gallerySections : ['general']
      })

    setLoading(false)

    if(error){
      console.error(error)
      return alert("Error al crear negocio")
    }

    alert("Negocio creado")
    router.push(`/mapa`)
  }

  return(

    <div className="max-w-xl mx-auto p-6 space-y-6">

      <h1 className="text-xl font-semibold">
        SuperAdmin — Crear negocio
      </h1>

      <input
        placeholder="Nombre"
        value={name}
        onChange={e=>setName(e.target.value)}
        className="w-full h-10 px-3 rounded-lg border text-sm"
      />

      <input
        placeholder="Slug"
        value={slug}
        onChange={e=>setSlug(e.target.value)}
        className="w-full h-10 px-3 rounded-lg border text-sm"
      />

      <input
        placeholder="Tipo"
        value={type}
        onChange={e=>setType(e.target.value)}
        className="w-full h-10 px-3 rounded-lg border text-sm"
      />

      {/* 📍 UBICACIÓN */}
      <div className="grid grid-cols-2 gap-2">

        <input
          placeholder="Lat"
          value={lat}
          onChange={e=>setLat(e.target.value)}
          className="w-full h-10 px-3 rounded-lg border text-sm"
        />

        <input
          placeholder="Lng"
          value={lng}
          onChange={e=>setLng(e.target.value)}
          className="w-full h-10 px-3 rounded-lg border text-sm"
        />

      </div>

      {/* 🖼 LOGO */}
      <input
        placeholder="URL logo (cover_image)"
        value={coverImage}
        onChange={e=>setCoverImage(e.target.value)}
        className="w-full h-10 px-3 rounded-lg border text-sm"
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

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isActive}
            onChange={()=>setIsActive(!isActive)}
          />
          Activo
        </label>

      </div>

      {/* 💥 GALERÍAS */}
      <div className="space-y-2 text-sm">

        <div className="font-semibold">
          Secciones de galería
        </div>

        {[
          { id: "general", label: "General" },
          { id: "c421_home", label: "Home" },
          { id: "residencia", label: "Residencia" },
          { id: "talleres", label: "Talleres" },
          { id: "obras", label: "Obras" },
        ].map(opt => (
          <label key={opt.id} className="flex items-center gap-2">

            <input
              type="checkbox"
              checked={gallerySections.includes(opt.id)}
              onChange={()=>toggleSection(opt.id)}
            />

            {opt.label}

          </label>
        ))}

      </div>

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