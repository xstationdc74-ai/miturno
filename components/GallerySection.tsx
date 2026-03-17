'use client'

import { useState } from "react"
import Gallery from "./Gallery"
import GalleryUpload from "./GalleryUpload"

export default function GallerySection({ businessId }: { businessId: string }){

  const [refresh,setRefresh] = useState(0)

  return(

    <div className="bg-white p-4 rounded-xl border">

      <h2 className="text-sm font-semibold mb-3">
        Galería
      </h2>

      <GalleryUpload
        businessId={businessId}
        onUpload={()=>setRefresh(prev=>prev+1)}
      />

      <div className="mt-4">
        <Gallery key={refresh} businessId={businessId} />
      </div>

    </div>

  )

}