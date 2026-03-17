'use client'

import { useState } from "react"
import { supabase } from "@/lib/supabase/client"

export default function BusinessBannerUpload({ businessId }:{businessId:string}){

  const [uploading,setUploading] = useState(false)

  const handleUpload = async (e:any)=>{

    const file = e.target.files?.[0]

    if(!file) return

    if(file.size > 2 * 1024 * 1024){
      alert("La imagen debe ser menor a 2MB")
      return
    }

    setUploading(true)

    const extension = file.name.split(".").pop()
    const fileName = `${businessId}-${Date.now()}.${extension}`

    const { error:uploadError } = await supabase.storage
      .from("business-images")
      .upload(fileName,file)

    if(uploadError){
      console.error(uploadError)
      setUploading(false)
      return
    }

    const { data } = supabase.storage
      .from("business-images")
      .getPublicUrl(fileName)

    const publicUrl = data.publicUrl

    const { error:updateError } = await supabase
      .from("business")
      .update({ cover_image: publicUrl })
      .eq("id", businessId)

    if(updateError){
      console.error(updateError)
    }

    setUploading(false)

    location.reload()

  }

  return(

    <div>

      <label className="block text-sm font-semibold mb-2">
        Banner del negocio
      </label>

      <label className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg text-sm cursor-pointer">

        {uploading ? "Subiendo..." : "Subir banner"}

        <input
          type="file"
          onChange={handleUpload}
          className="hidden"
        />

      </label>

    </div>

  )

}