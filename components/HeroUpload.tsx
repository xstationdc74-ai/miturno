'use client'

import { supabase } from "@/lib/supabase/client"
import { useState } from "react"

export default function HeroUpload({
  businessId,
  onUpload
}:{
  businessId:string
  onUpload:(url:string)=>void
}){

  const [loading,setLoading] = useState(false)

  const handleUpload = async (e:any) => {

    const file = e.target.files[0]
    if(!file) return

    setLoading(true)

    const fileName = `hero-${Date.now()}-${file.name}`

    const { error } = await supabase.storage
      .from("business-images")
      .upload(fileName,file)

    if(error){
      console.error(error)
      setLoading(false)
      return
    }

    const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/business-images/${fileName}`

    onUpload(publicUrl)

    setLoading(false)
  }

  return(

    <label className="block bg-green-600 text-white text-center py-2 rounded-lg text-sm cursor-pointer">
      {loading ? "Subiendo..." : "Subir banner"}
      <input
        type="file"
        onChange={handleUpload}
        className="hidden"
      />
    </label>

  )

}