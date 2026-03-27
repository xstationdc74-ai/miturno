'use client'

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { useParams } from "next/navigation"
import Gallery from "@/components/Gallery"

type Business = {
  id: string
  name: string
  description: string
  hero_text?: string
  hero_image?: string
  gallery_pages?: string[]
}

export default function ResidenciaPage(){

  const params = useParams()
  const slug = params.slug as string

  const [biz,setBiz] = useState<Business | null>(null)

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
    }
  }

  if(!biz){
    return <div className="p-10">Cargando...</div>
  }

  // 🔥 calcular gallery dinámica para HOME
  const galleryIndex = biz.gallery_pages?.findIndex(
    (p)=>p==="home"
  )

  const gallerySection =
    galleryIndex !== undefined && galleryIndex !== -1
      ? `gallery_${galleryIndex+1}`
      : null

  return(

    <div className="max-w-4xl mx-auto space-y-10 pb-10">

      {/* HERO */}
      {biz.hero_image && (
        <div className="w-full h-56 overflow-hidden">
          <img
            src={biz.hero_image}
            className="w-full h-full object-cover object-center"
          />
        </div>
      )}

      <div className="px-6 space-y-8">

        {/* LOGO */}
        <div className="text-center">
          <img
            src="/c421-logo.png"
            className="mx-auto w-24 opacity-90"
          />
        </div>

        {/* TEXTO */}
        {biz.hero_text && (
          <div className="text-center max-w-xl mx-auto text-sm text-gray-600 leading-relaxed whitespace-pre-line">
            {biz.hero_text}
          </div>
        )}

        {/* GALERÍA DINÁMICA */}
        {gallerySection && (
          <Gallery
            businessId={biz.id}
            section={gallerySection}
          />
        )}

        {/* BOTONES */}
        <div className="flex gap-3 justify-center flex-wrap">

          <a
            href={`/residencias/${slug}/residencia`}
            className="bg-green-600 text-white px-5 py-2 rounded-lg text-sm"
          >
            Residencia
          </a>

          <a
            href={`/residencias/${slug}/talleres`}
            className="bg-green-600 text-white px-5 py-2 rounded-lg text-sm"
          >
            Talleres
          </a>

          <a
            href={`/residencias/${slug}/obras`}
            className="bg-green-600 text-white px-5 py-2 rounded-lg text-sm"
          >
            Obras
          </a>

        </div>

      </div>

    </div>

  )

}