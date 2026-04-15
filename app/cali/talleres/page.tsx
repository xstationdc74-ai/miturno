"use client"

import CaliNav from "@/components/CaliNav"
import { useState } from "react"

type Taller = {
  id: number
  title: string
  image: string
  date: string
  time: string
  location: string
  price: string
  capacity: number
  reserved: number
  description: string
}

const talleres: Taller[] = [
  {
    id: 1,
    title: "Taller de tintas del bosque",
    image: "/taller-tintas.jpeg",
    date: "Sábado 18/04",
    time: "11 a 13 hs",
    location: "El Bondi de la Bayer",
    price: "$25.000",
    capacity: 10,
    reserved: 6,
    description:
      "Exploramos tintas naturales, teñido y estampado con plantas del bosque.",
  },
]

export default function CaliTalleres() {

  // 🔥 ESTADO MODAL
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const handleWhatsApp = (t: Taller) => {
    const message = `Hola Cali 🌿

Quiero reservar un lugar en:

"${t.title}"
📅 ${t.date}
⏰ ${t.time}

¿Quedan cupos disponibles?

¡Gracias!`

    const url = `https://wa.me/5491134490093?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* 🌿 NAV */}
      <CaliNav />

      {/* 🌿 HEADER */}
      <div className="text-center py-12 space-y-4">

        <div className="inline-block bg-[#7FA6C9]/30 backdrop-blur-sm px-6 py-2 rounded-xl">
          <h1 className="text-3xl font-serif italic text-gray-800">
            Talleres
          </h1>
        </div>

        <p className="text-lg md:text-xl font-serif italic text-gray-600">
          Experiencias para conectar con el bosque
        </p>

      </div>

      {/* 🌿 LISTA */}
      <div className="max-w-3xl mx-auto px-4 space-y-12 flex-1">

        {talleres.map((t) => {

          const available = t.capacity - t.reserved

          return (
            <div
              key={t.id}
              className="rounded-2xl overflow-hidden border shadow-sm"
            >

              {/* 🌿 IMAGEN CLICKABLE */}
              <div className="w-full h-[350px] cursor-pointer">
                <img
                  src={t.image}
                  onClick={() => setSelectedImage(t.image)}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 🌿 INFO */}
              <div className="p-6 space-y-4">

                <h2 className="text-xl font-serif italic text-[#7FA6C9]">
                  {t.title}
                </h2>

                <p className="text-gray-600 text-sm">
                  {t.description}
                </p>

                <div className="text-sm text-gray-600 space-y-1">
                  <div>📅 {t.date}</div>
                  <div>⏰ {t.time}</div>
                  <div>📍 {t.location}</div>
                </div>

                <div className="flex justify-between items-center pt-2">

                  <div className="space-y-1">
                    <div className="text-sm font-medium">
                      {t.price}
                    </div>

                    <div className="text-xs text-gray-500">
                      {available > 0
                        ? `Quedan ${available} de ${t.capacity} cupos`
                        : "Sin cupos disponibles"}
                    </div>
                  </div>

                  <button
                    onClick={() => handleWhatsApp(t)}
                    disabled={available <= 0}
                    className={`px-5 py-2 rounded-full text-sm text-white transition
                      ${available > 0
                        ? "bg-[#7FA6C9] hover:bg-[#6B93B5]"
                        : "bg-gray-400 cursor-not-allowed"}`}
                  >
                    Reservar 🌿
                  </button>

                </div>

              </div>

            </div>
          )
        })}

      </div>

      {/* 🌿 MODAL */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <img
            src={selectedImage}
            className="max-w-[90%] max-h-[90%] rounded-xl"
          />
        </div>
      )}

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