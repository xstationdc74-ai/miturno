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

export default function ObrasPage(){

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

      const pages = data.gallery_pages || []
      const index = pages.findIndex((p:string)=> p === "obras")

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
        Obras
      </h1>

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

    </div>

  )

}