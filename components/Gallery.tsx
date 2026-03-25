'use client'

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"

export default function Gallery({
  businessId,
  section,
  editable
}:{
  businessId: string
  section?: string
  editable?: boolean
}) {

  const [images,setImages] = useState<any[]>([])

  const load = async () => {

    let query = supabase
      .from("gallery")
      .select("*")
      .eq("business_id", businessId)
      .order("created_at",{ ascending:false })

    if(section){
      query = query.eq("section", section)
    }

    const { data } = await query

    setImages(data || [])
  }

  const remove = async (id:string) => {

    await supabase
      .from("gallery")
      .delete()
      .eq("id", id)

    load()
  }

  useEffect(()=>{
    load()
  },[])

  if(images.length === 0){
    return <div className="text-sm text-gray-400">Sin imágenes</div>
  }

  return(

    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">

      {images.slice(0,6).map(img=>(
        <div key={img.id} className="relative">

          <img
            src={img.image_url}
            className="w-full h-32 object-cover rounded-lg"
          />

          {editable && (
            <button
              onClick={()=>remove(img.id)}
              className="absolute top-1 right-1 bg-black/70 text-white text-xs px-2 py-1 rounded"
            >
              ✕
            </button>
          )}

        </div>
      ))}

    </div>

  )

}