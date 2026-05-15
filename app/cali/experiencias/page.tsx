"use client"

import CaliNav from "@/components/cali/CaliNav"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"

type Evento = {
  id: string
  name: string
  description: string
  image_url: string
  date: string
  end_date: string
  location: string
  type: string
  promo_text: string
  price: number
  capacity: number
}

export default function CaliEventos() {

  const [eventos, setEventos] = useState<Evento[]>([])
  const [loading, setLoading] = useState(true)

  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {

    const loadEventos = async () => {

      const { data } = await supabase
        .from("events")
        .select("*")
        .eq("business_id", "20ce3f03-7991-423e-8495-d90ed8b1acea")
        .eq("is_active", true)
.gte(
  "end_date",
  new Date(
    Date.now() - 7 * 24 * 60 * 60 * 1000
  ).toISOString()
)
.order("date", { ascending: true })

      setEventos(data || [])
      setLoading(false)
    }

    loadEventos()

  }, [])

  const handleWhatsApp = (e: Evento) => {

    const message = `Hola Cali 🌿

Me interesa participar en:

"${e.name}"

📅 ${new Date(e.date).toLocaleDateString("es-AR")}

📍 ${e.location}

¿Hay lugar disponible?

¡Gracias!`

    const url = `https://wa.me/5491124604472?text=${encodeURIComponent(message)}`

    window.open(url, "_blank")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-gray-500 italic font-serif">
        Cargando experiencias...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* 🌿 NAV */}
      <CaliNav />

      {/* 🌿 HEADER */}
      <div className="text-center py-12 space-y-4">

        <div className="inline-block bg-[#7FA6C9]/30 backdrop-blur-sm px-6 py-2 rounded-xl">
          <h1 className="text-3xl font-serif italic text-gray-800">
            Experiencias
          </h1>
        </div>

        <p className="text-lg md:text-xl font-serif italic text-gray-600">
          Recorridos, talleres y encuentros en el bosque
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
                src={e.image_url}
                onClick={() => setSelectedImage(e.image_url)}
                className="w-full h-full object-cover"
              />

            </div>

            {/* 🌿 INFO */}
            <div className="p-6 space-y-4">

              <div className="flex items-center justify-between gap-4">

                <h2 className="text-xl font-serif italic text-[#7FA6C9]">
                  {e.name}
                </h2>

                <div className="text-xs uppercase tracking-wider text-gray-400">
                  {e.type}
                </div>

              </div>

              <p className="text-gray-600 text-sm">
                {e.description}
              </p>

              <div className="text-sm text-gray-600 space-y-1">

                <div>
                  📅 {new Date(e.date).toLocaleDateString("es-AR")}
                </div>

                <div>
                  👥 {e.capacity} cupos
                </div>

                <div>
                  💰 ${e.price}
                </div>

                <div>
                  📍 {e.location}
                </div>

              </div>

              {e.promo_text && (

                <div className="bg-[#7FA6C9]/10 text-[#7FA6C9] rounded-2xl px-4 py-3 text-sm">

                  ✨ {e.promo_text}

                </div>

              )}

              <button
                onClick={() => handleWhatsApp(e)}
                className="mt-3 px-5 py-2 rounded-full text-sm text-white bg-[#7FA6C9] hover:bg-[#6B93B5] transition"
              >
                Quiero vivir esta experiencia 🌿
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