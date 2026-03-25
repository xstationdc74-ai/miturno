"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { useParams } from "next/navigation"
import Gallery from "@/components/Gallery"

type Business = {
  id: string
  name: string
  gallery_pages?: string[]
}

export default function ResidenciaDetailPage(){

  const params = useParams()
  const slug = params.slug as string

  const [biz,setBiz] = useState<Business | null>(null)
  const [section,setSection] = useState<string | null>(null)

  useEffect(()=>{
    load()
  },[])

  const load = async () => {

    const { data } = await supabase
      .from("business")
      .select("*")
      .eq("slug", slug)
      .single()

    if(data){
      setBiz(data)

      // 💥 buscamos qué galería corresponde a "residencia"
      const pages = data.gallery_pages || []
      const index = pages.findIndex((p:string)=> p === "residencia")

      if(index !== -1){
        setSection(`gallery_${index+1}`)
      }
    }
  }

  if(!biz){
    return <div className="p-10">Cargando...</div>
  }

  return(

    <div className="max-w-4xl mx-auto p-6 space-y-10">

      <h1 className="text-2xl font-semibold">
        Residencia
      </h1>

      {/* GALERÍA */}
      {section ? (
        <Gallery
          businessId={biz.id}
          section={section}
        />
      ) : (
        <div className="text-sm text-gray-400">
          Sin galería asignada
        </div>
      )}

      {/* CTA */}
      <a
        href={`/book/${slug}`}
        className="block text-center bg-green-600 text-white py-3 rounded-lg"
      >
        Aplicar / Reservar
      </a>

    </div>

  )

}