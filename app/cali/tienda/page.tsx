"use client"

import CaliNav from "@/components/cali/CaliNav"
import { useEffect, useState } from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase/client"

type Piece = {
  id: string
  slug: string
  name: string
  short_description: string
  description: string
  image_url: string
  price: number
}

export default function CaliTienda() {

  const [pieces, setPieces] = useState<Piece[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const loadProducts = async () => {

      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("business_id", "20ce3f03-7991-423e-8495-d90ed8b1acea")
        .order("created_at", { ascending: false })

     const formatted = (data || []).map((p: any) => ({
  id: p.id,
  slug: p.slug || "",
  name: p.name,
  short_description: p.short_description || "",
  description: p.description || "",
  image_url: p.image_url || "/cali-hero.jpg",
  price: p.price || 0,
}))

      setPieces(formatted)

      setLoading(false)
    }

    loadProducts()

  }, [])

  const handleWhatsApp = (piece: Piece) => {

    const message = `Hola Cali 🌿

Estoy viendo tu tienda y me encantó la pieza:

"${piece.name}"

💰 $${piece.price}

¿Sigue disponible?`

    const url = `https://wa.me/5491124604472?text=${encodeURIComponent(message)}`

    window.open(url, "_blank")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-gray-500 italic font-serif">
        Cargando piezas...
      </div>
    )
  }

  return (

    <div className="min-h-screen bg-white flex flex-col">

      {/* 🌿 NAV GLOBAL */}
      <CaliNav />

      {/* 🌿 HEADER */}
      <div className="text-center py-12 space-y-4">

        <div className="inline-block bg-[#7FA6C9]/30 backdrop-blur-sm px-6 py-2 rounded-xl">

          <h1 className="text-3xl font-serif italic text-gray-800">
            Tienda
          </h1>

        </div>

        <p className="text-lg md:text-xl font-serif italic text-gray-600">
          Piezas únicas nacidas del bosque
        </p>

      </div>

      {/* 🌿 GRID */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto px-4 flex-1">

        {pieces.map((p) => (

          <div
            key={p.id}
            className="bg-white rounded-xl overflow-hidden border hover:shadow-md transition"
          >

            <Link href={`/cali/tienda/${p.slug}`}>

  <div className="aspect-square bg-gray-100 cursor-pointer">

    <img
      src={p.image_url || "/cali-hero.jpg"}
      className="w-full h-full object-cover hover:scale-[1.02] transition"
    />

  </div>

</Link>

            <div className="p-4 space-y-3">

              <Link
  href={`/cali/tienda/${p.slug}`}
  className="block font-medium text-gray-800 hover:text-[#7FA6C9] transition"
>
  {p.name}
</Link>
<div className="text-sm text-gray-500">
  {p.short_description || p.description}
</div>

              <div className="text-sm text-[#7FA6C9]">
                ${p.price}
              </div>

              <button
                onClick={() => handleWhatsApp(p)}
                className="w-full mt-2 bg-[#7FA6C9] hover:bg-[#6B93B5] text-white py-2 rounded-xl text-sm transition"
              >
                Reservar pieza 🌿
              </button>

            </div>

          </div>

        ))}

      </div>

      {/* 🌿 FOOTER */}
      <div className="border-t py-10 text-center space-y-4 mt-10">

        <p className="text-sm text-gray-500">
          ¿Te gustaría una app para vos?
        </p>

        <a
          href="https://wa.me/5491134490093?text=Hola!%20👋%20Vi%20Cali%20y%20me%20encantó.%20Quisiera%20una%20app%20para%20mi%20proyecto."
          target="_blank"
          className="inline-block text-sm underline text-gray-700"
        >
          Escribinos por WhatsApp
        </a>

      </div>

    </div>
  )
}