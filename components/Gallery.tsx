'use client'

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"

type Props = {
  businessId: string
  section: string
}

export default function Gallery({ businessId, section }: Props) {

  const [images,setImages] = useState<any[]>([])

  const load = async () => {

    if(!section) return

    const { data } = await supabase
      .from("gallery")
      .select("*")
      .eq("business_id", businessId)
      .eq("section", section)
      .order("created_at",{ ascending:false })

    setImages(data || [])
  }

  useEffect(()=>{
    if(!section || !businessId) return
    load()
  },[section, businessId])

  if(images.length === 0){
    return <div className="text-sm text-gray-400">Sin imágenes</div>
  }

  return(
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
      {images.map(img=>(
        <img
          key={img.id}
          src={img.image_url}
          className="w-full h-32 object-cover rounded-lg"
        />
      ))}
    </div>
  )
}