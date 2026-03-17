'use client'

import { useState } from "react"
import { supabase } from "@/lib/supabase/client"

export default function BusinessSettings({
  business
}:{
  business:any
}){

  const [places,setPlaces] = useState(business.places || 1)
  const [description,setDescription] = useState(business.description || "")
  const [loading,setLoading] = useState(false)

  const handleSave = async () => {

    setLoading(true)

    await supabase
      .from("business")
      .update({
        places,
        description
      })
      .eq("id",business.id)

    setLoading(false)

    alert("Guardado")
  }

  return(

    <div className="space-y-4">

      {/* CAPACIDAD */}
      <div>

        <label className="text-xs text-gray-500">
          Capacidad simultánea
        </label>

        <input
          type="number"
          value={places}
          onChange={e=>setPlaces(Number(e.target.value))}
          className="w-full mt-1 h-10 px-3 rounded-lg border border-gray-200 text-sm"
        />

      </div>

      {/* DESCRIPCIÓN */}
      <div>

        <label className="text-xs text-gray-500">
          Descripción
        </label>

        <textarea
          value={description}
          onChange={e=>setDescription(e.target.value)}
          className="w-full mt-1 p-3 rounded-lg border border-gray-200 text-sm"
          rows={3}
        />

      </div>

      {/* CTA */}
      <button
        onClick={handleSave}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm"
      >
        {loading ? "Guardando..." : "Guardar cambios"}
      </button>

    </div>

  )

}