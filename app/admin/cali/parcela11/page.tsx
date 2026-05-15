"use client"

import CaliNav from "@/components/cali/CaliNav"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"

type ParcelaContent = {
  hero_title: string
  hero_subtitle: string
  main_text: string
  image_url: string
}

export default function Parcela11Page() {

  const [content, setContent] = useState<ParcelaContent | null>(null)

  useEffect(() => {

    const loadContent = async () => {

      const { data } = await supabase
        .from("parcela_content")
        .select("*")
        .eq("business_id", "20ce3f03-7991-423e-8495-d90ed8b1acea")
        .single()

      setContent(data)
    }

    loadContent()

  }, [])

  return (

    <div className="min-h-screen bg-white flex flex-col">

      {/* 🌿 NAV */}
      <CaliNav />

      {/* 🌿 HERO */}
      <div className="max-w-4xl mx-auto px-6 py-16 text-center space-y-6">

        <h1 className="text-3xl md:text-4xl font-serif italic text-[#7FA6C9]">
          {content?.hero_title || "Parcela 11"}
        </h1>

        <p className="text-lg md:text-xl font-serif italic text-gray-600">
          {content?.hero_subtitle || "Un espacio vivo entre bosque y encuentro"}
        </p>

      </div>

      {/* 🌿 CONTENIDO */}
      <div className="max-w-5xl mx-auto px-6 pb-20 space-y-10">

        {content?.image_url && (

          <img
            src={content.image_url}
            className="w-full rounded-3xl object-cover"
          />

        )}

        <div className="max-w-3xl mx-auto space-y-6 text-center text-gray-600 leading-relaxed">

          {content?.main_text
            ?.split("\n")
            .map((paragraph, index) => (

              <p key={index}>
                {paragraph}
              </p>

            ))}

        </div>

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