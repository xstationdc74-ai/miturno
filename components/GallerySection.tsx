'use client'

import { useState } from "react"
import Gallery from "./Gallery"
import GalleryUpload from "./GalleryUpload"
import { supabase } from "@/lib/supabase/client"

const PAGE_OPTIONS = ["home","residencia","talleres","obras"]

export default function GallerySection({
  businessId,
  section,
  index,
  currentName,
  currentPage,
  allPages,
  onChange
}: {
  businessId: string
  section: string
  index: number
  currentName?: string
  currentPage?: string
  allPages?: string[]
  onChange?: ()=>void
}){

  const [refresh,setRefresh] = useState(0)
  const [name,setName] = useState(currentName || "")
  const [page,setPage] = useState(currentPage || "")
  const [saving,setSaving] = useState(false)

  const availablePages = PAGE_OPTIONS.filter(p =>
    !allPages?.includes(p) || p === page
  )

  const saveAll = async () => {

    setSaving(true)

    const { data } = await supabase
      .from("business")
      .select("gallery_names, gallery_pages")
      .eq("id", businessId)
      .single()

    let names = data?.gallery_names || []
    let pages = data?.gallery_pages || []

    names[index] = name
    pages[index] = page

    await supabase
      .from("business")
      .update({
        gallery_names: names,
        gallery_pages: pages
      })
      .eq("id", businessId)

    setSaving(false)

    onChange?.() // 💥 refresh sin reload
  }

  return(

    <div className="bg-white p-4 rounded-xl border space-y-3">

      {/* NOMBRE */}
      <input
        value={name}
        onChange={e=>setName(e.target.value)}
        placeholder={`Galería ${index+1}`}
        className="w-full h-9 px-2 rounded border text-sm"
      />

      {/* SELECT */}
      <select
        value={page}
        onChange={e=>setPage(e.target.value)}
        className="w-full h-9 px-2 rounded border text-sm"
      >
        <option value="">Seleccionar sección</option>

        {availablePages.map(p=>(
          <option key={p} value={p}>
            {p}
          </option>
        ))}

      </select>

      <button
        onClick={saveAll}
        className="w-full h-9 bg-green-600 text-white text-sm rounded"
      >
        {saving ? "Guardando..." : "Guardar"}
      </button>

      <GalleryUpload
        businessId={businessId}
        section={section}
        onUpload={()=>setRefresh(prev=>prev+1)}
      />

      <Gallery
        key={refresh}
        businessId={businessId}
        section={section}
        editable
      />

    </div>

  )

}