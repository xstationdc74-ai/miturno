"use client"

import CaliNav from "@/components/cali/CaliNav"
import { supabase } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

type Piece = {
  id: string
  slug: string
  name: string
  description: string
  full_description: string
  image_url: string
  gallery_images: string[]
  price: number
}

export default function PiecePage() {

  const params = useParams()

  const [piece, setPiece] = useState<Piece | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const loadPiece = async () => {

      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("slug", params.slug)
        .single()

      setPiece(data)

      setLoading(false)
    }

    loadPiece()

  }, [params.slug])

  const handleShare = async () => {

    if (!piece) return

    console.log("share", navigator.share)
console.log("clipboard", navigator.clipboard)

    if (navigator.share) {

      await navigator.share({
        title: piece.name,
        text: `${piece.name} · Cali Patagonia 🌿`,
        url: window.location.href,
      })

    } else {

      navigator.clipboard.writeText(window.location.href)

      alert("Link copiado ✨")
    }
  }

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center text-gray-500 italic">
        Cargando pieza...
      </div>

    )
  }

  if (!piece) {

    return (

      <div className="min-h-screen flex items-center justify-center text-gray-500 italic">
        Pieza no encontrada
      </div>

    )
  }

  const handleWhatsAppLink = `https://wa.me/5491124604472?text=${encodeURIComponent(
    `Hola Cali 🌿

Estoy viendo esta pieza y me encantó:

"${piece.name}"

💰 $${piece.price}

¿Sigue disponible?`
  )}`

  return (

    <div className="min-h-screen bg-white">

      <CaliNav />

      <div className="max-w-6xl mx-auto px-6 py-12">

        <div className="grid md:grid-cols-2 gap-10">

          {/* 🌿 IMAGEN */}
          <div className="space-y-4">

            <div className="rounded-3xl overflow-hidden border">

              <img
               src={
  piece.image_url?.trim()
    ? piece.image_url
    : "/cali-hero.jpg"
}
                className="w-full object-cover"
              />

            </div>

          </div>

          {/* 🌿 INFO */}
          <div className="space-y-6">

            <div className="space-y-3">

              <h1 className="text-3xl md:text-4xl font-serif italic text-gray-800">
                {piece.name}
              </h1>

              <p className="text-2xl text-[#7FA6C9]">
                ${piece.price}
              </p>

            </div>

            {(piece.full_description || piece.description) && (

            <div className="text-gray-600 leading-relaxed whitespace-pre-line">
  {piece.full_description || piece.description}
</div>

            )}

            <div className="flex flex-col sm:flex-row gap-4 pt-4">

              <a
                href={handleWhatsAppLink}
                target="_blank"
                className="flex-1 bg-[#7FA6C9] hover:bg-[#6B93B5] text-white py-3 rounded-2xl text-center transition"
              >
                Reservar pieza 🌿
              </a>

              <button
                onClick={handleShare}
                className="flex-1 border border-[#7FA6C9] text-[#7FA6C9] hover:bg-[#7FA6C9]/10 py-3 rounded-2xl transition"
              >
                Compartir pieza ↗
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}