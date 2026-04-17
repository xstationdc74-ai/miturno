"use client"

import CaliNav from "@/components/CaliNav"
import { useState } from "react"

type Evento = {
  id: number
  title: string
  image: string
  date: string
  time: string
  location: string
  description: string
}

const eventos: Evento[] = [
  {
    id: 1,
    title: "Encuentro de tintas y fuego",
    image: "/evento-cali.jpg", // 👉 poné una imagen linda después
    date: "Domingo 20/04",
    time: "18 hs",
    location: "El Bondi de la Bayer",
    description:
      "Un encuentro para compartir, experimentar con tintas naturales y cerrar el día junto al fuego.",
  },
]

export default function CaliEventos() {

  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const handleWhatsApp = (e: Evento) => {
    const message = `Hola Cali 🌿

Me interesa participar en:

"${e.title}"
📅 ${e.date}
⏰ ${e.time}

¿Hay lugar disponible?

¡Gracias!`

    const url = `https://wa.me/5491124604472?text=${encodeURIComponent(message)}`
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
            Eventos
          </h1>
        </div>

        <p className="text-lg md:text-xl font-serif italic text-gray-600">
          Encuentros para compartir y conectar
        </p>

      </div>

      {/* 🌿 LISTA */}
      <div className="max-w-3xl mx-auto px-4 space-y-12 flex-1">

        {eventos.map((e) => (

          <div
            key={e.id}
            className="rounded-2xl overflow-hidden border shadow-sm"
          >

            {/* 🌿 IMAGEN */}
            <div className="w-full h-[350px] cursor-pointer">
              <img
                src={e.image}
                onClick={() => setSelectedImage(e.image)}
                className="w-full h-full object-cover"
              />
            </div>

            {/* 🌿 INFO */}
            <div className="p-6 space-y-4">

              <h2 className="text-xl font-serif italic text-[#7FA6C9]">
                {e.title}
              </h2>

              <p className="text-gray-600 text-sm">
                {e.description}
              </p>

              <div className="text-sm text-gray-600 space-y-1">
                <div>📅 {e.date}</div>
                <div>⏰ {e.time}</div>
                <div>📍 {e.location}</div>
              </div>

              <button
                onClick={() => handleWhatsApp(e)}
                className="mt-3 px-5 py-2 rounded-full text-sm text-white bg-[#7FA6C9] hover:bg-[#6B93B5] transition"
              >
                Quiero participar 🌿
              </button>

            </div>

          </div>

        ))}

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