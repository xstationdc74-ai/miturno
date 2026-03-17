'use client'

import { supabase } from "@/lib/supabase/client"
import { useState } from "react"

export default function GalleryUpload({
  businessId,
  onUpload
}:{
  businessId:string
  onUpload?:()=>void
}){

  const [loading,setLoading] = useState(false)

  const handleUpload = async (e:any) => {

    const file = e.target.files[0]
    if(!file) return

    setLoading(true)

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
        image_url:publicUrl
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