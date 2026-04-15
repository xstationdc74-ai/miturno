"use client"

import Link from "next/link"
import CaliNav from "@/components/CaliNav"

type Piece = {
  id: number
  name: string
  description: string
  image: string
  price?: string
}

const pieces: Piece[] = [
  {
    id: 1,
    name: "Textil natural",
    description: "Teñido con pigmentos del bosque nativo",
    image: "/cali-hero.jpg",
    price: "$45.000"
  },
  {
    id: 2,
    name: "Tinte botánico",
    description: "Proceso artesanal con fibras orgánicas",
    image: "/cali-hero.jpg",
    price: "$38.000"
  },
  {
    id: 3,
    name: "Pieza experimental",
    description: "Exploración libre entre textura y color",
    image: "/cali-hero.jpg",
    price: "$52.000"
  }
]

export default function CaliGaleria(){

  const handleWhatsApp = (piece: Piece) => {

    const message = `Hola Cali 🌿

Estoy viendo tu galería y me encantó la pieza "${piece.name}"${piece.price ? ` por ${piece.price}` : ""}.

¿Sigue disponible?`

    const url = `https://wa.me/5491134490093?text=${encodeURIComponent(message)}`

    window.open(url, "_blank")
  }

  return (

    <div className="min-h-screen bg-white flex flex-col">

      {/* 🌿 NAV GLOBAL */}
      <CaliNav />

      {/* 🌿 HEADER */}
      <div className="text-center py-12 space-y-4">

        {/* TÍTULO CON FONDO */}
        <div className="inline-block bg-[#7FA6C9]/30 backdrop-blur-sm px-6 py-2 rounded-xl">
          <h1 className="text-3xl font-serif italic text-gray-800">
            Galería
          </h1>
        </div>

        {/* SUBTÍTULO */}
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

            <div className="aspect-square bg-gray-100">
              <img
                src={p.image}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4 space-y-2">

              <div className="font-medium">
                {p.name}
              </div>

              <div className="text-sm text-gray-500">
                {p.description}
              </div>

              {p.price && (
                <div className="text-sm text-gray-600">
                  {p.price}
                </div>
              )}

              <button
                onClick={() => handleWhatsApp(p)}
                className="w-full mt-2 bg-[#7FA6C9] hover:bg-[#6B93B5] text-white py-2 rounded-lg text-sm transition"
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