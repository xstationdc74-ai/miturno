"use client"

import { supabase } from "@/lib/supabase/client"
import { useState } from "react"

export default function GalleryUpload({
  businessId,
  section,
  onUpload
}:{
  businessId:string
  section:string
  onUpload?:()=>void
}){

  const [loading,setLoading] = useState(false)

  const handleUpload = async (e:any) => {

    const file = e.target.files[0]
    if(!file) return

    setLoading(true)

    // 🔥 1. TRAER LIMIT
    const { data: biz } = await supabase
      .from("business")
      .select("gallery_limit")
      .eq("id", businessId)
      .single()

    const limit = biz?.gallery_limit || 1

    // 🔥 2. CONTAR SECCIONES USADAS
    const { data: sections } = await supabase
      .from("gallery")
      .select("section")
      .eq("business_id", businessId)

    const uniqueSections = Array.from(
      new Set((sections || []).map(s => s.section))
    )

    // 🔥 3. VALIDAR LIMITE
    const isNewSection = !uniqueSections.includes(section)

    if(isNewSection && uniqueSections.length >= limit){
      alert(`Límite de galerías alcanzado (${limit})`)
      setLoading(false)
      return
    }

    // 🔥 SUBIDA NORMAL
    const fileName = `${Date.now()}-${file.name}`

    const { error } = await supabase.storage
      .from("business-images")
      .upload(fileName,file)

    if(error){
      console.error(error)
      setLoading(false)
      return
    }

    const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/business-images/${fileName}`

    await supabase
      .from("gallery")
      .insert({
        business_id:businessId,
        image_url:publicUrl,
        section:section
      })

    setLoading(false)

    onUpload?.()
  }

  return(

    <div>

      <label className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg text-sm cursor-pointer">
        {loading ? "Subiendo..." : "Subir imagen"}
        <input
          type="file"
          onChange={handleUpload}
          className="hidden"
        />
      </label>

    </div>

  )

}