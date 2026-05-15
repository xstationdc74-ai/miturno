"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import CaliNav from "@/components/cali/CaliNav"

export default function CaliHome() {

  const [content, setContent] = useState<any>(null)

useEffect(() => {

  const loadContent = async () => {

    const { data } = await supabase
      .from("business_content")
      .select("*")
      .eq("business_id", "20ce3f03-7991-423e-8495-d90ed8b1acea")
      .eq("section", "home")
      .single()

    if (data) {
      setContent(data)
    }
  }

  loadContent()

}, [])

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* 🌿 NAV GLOBAL */}
      <CaliNav />

      {/* 🌿 HERO */}
      <div className="relative h-screen w-full">

        {/* IMAGEN */}
        <img
          src={content?.hero_image || "/cali-hero.jpg"}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/20" />

        {/* CONTENIDO */}
        <div className="relative z-10 flex items-center justify-center h-full px-6">

          <div className="bg-black/30 backdrop-blur-sm px-6 py-6 rounded-xl text-white text-center">

            <img
              src="/cali-logo.jpg"
              className="w-40 mx-auto mb-4"
            />

            <p className="text-xl md:text-2xl max-w-xl italic tracking-wide font-serif">
              {content?.hero_text || "Textiles que nacen del bosque"}
            </p>

            <Link
              href="/cali/mundo"
              className="inline-block mt-6 px-6 py-3 rounded-full text-sm bg-[#7FA6C9] hover:bg-[#6B93B5] transition"
            >
              {content?.cta_text || "Entrar al mundo Cali"}
            </Link>

          </div>

        </div>

      </div>

      {/* 🌿 TEXTO */}
      <div className="max-w-2xl mx-auto px-6 py-20 text-center space-y-6">

        <p className="text-[#7FA6C9] leading-relaxed text-lg">
          {content?.content || "Un espacio donde la naturaleza, el arte y la experimentación se encuentran."}
        </p>

      </div>

      {/* 🌿 IMAGEN */}
      <div className="w-full h-[70vh]">
        <img
          src="/cali-textil.jpg"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 🌿 FRASE */}
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">

        <p className="text-[#7FA6C9] leading-relaxed text-lg">
          Caminos, tintas y fibras que dialogan con el bosque nativo.
        </p>

      </div>

      {/* 🌿 CTA */}
      <div className="text-center pb-20">

        <Link
          href="/cali/mundo"
          className="inline-block px-6 py-3 rounded-full text-sm bg-[#7FA6C9] hover:bg-[#6B93B5] text-white transition"
        >
          Seguir recorriendo
        </Link>

      </div>

      {/* 🌿 FOOTER */}
      <div className="border-t py-12 text-center space-y-4">

        <p className="text-sm text-gray-500">
          ¿Te gustaría una app para vos?
        </p>

        <a
          href="https://wa.me/5491134490093text=Hola!%20👋%20Vi%20Cali%20y%20me%20encantó.%20Quisiera%20una%20app%20para%20mi%20proyecto."
          target="_blank"
          className="inline-block text-sm underline text-gray-700"
        >
          Escribinos por WhatsApp
        </a>

        <div>
          <a
            href="#"
            className="text-xs text-gray-400 underline"
          >
            ¿Querés saber más?
          </a>
        </div>

      </div>

    </div>
  )
}