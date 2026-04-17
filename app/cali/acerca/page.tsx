"use client"

import CaliNav from "@/components/CaliNav"

export default function CaliAcerca() {

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* 🌿 NAV */}
      <CaliNav />

      {/* 🌿 HERO */}
      <div className="max-w-4xl mx-auto px-6 py-16 text-center space-y-6">

        <h1 className="text-3xl md:text-4xl font-serif italic text-[#7FA6C9]">
          Acerca de...
        </h1>

        <p className="text-lg md:text-xl font-serif italic text-gray-600">
          Un vínculo entre el arte, el bosque y la experiencia
        </p>

      </div>

      {/* 🌿 CONTENIDO */}
      <div className="max-w-3xl mx-auto px-6 pb-20 space-y-8 text-center">

        <p className="text-gray-600 leading-relaxed">
          Soy Claudia, artesana textil.  
          Mi ateliêr está en medio del bosque de Villa La Angostura.
        </p>

        <p className="text-gray-600 leading-relaxed">
          Trabajo en contacto con la naturaleza, recorriéndola, observándola  
          y aprendiendo de sus formas, sus tiempos y sus colores.
        </p>

        {/* 🌿 BLOQUE IMAGEN + TEXTO */}
        <div className="grid md:grid-cols-2 gap-8 items-center text-center md:text-left">

          {/* 🌿 IMAGEN */}
          <img
            src="/claudia.jpg"
            className="w-full h-auto object-contain rounded-xl bg-white"
          />

          {/* 🌿 TEXTO LADO */}
          <div className="space-y-4 text-gray-600 leading-relaxed">

            <p>
              En Cali, cada proceso comienza en el bosque.  
              Las tintas nacen de la recolección consciente de especies locales,  
              y cada pieza se construye a partir de técnicas textiles ancestrales  
              que dialogan con una mirada contemporánea.
            </p>

            <p>
              Experimento combinando saberes de distintos lugares:  
              la aguada japonesa (Sumi-e), el Batik, el Ecoprint y el Shibori.  
              Cada técnica aporta una forma distinta de escuchar la materia.
            </p>

          </div>

        </div>

        <p className="text-gray-600 leading-relaxed">
          Creo piezas únicas, pero también abro el proceso.
        </p>

        <p className="text-gray-600 leading-relaxed">
          Invito a vivir las Experiencias Textiles en el Bosque:  
          recorridos donde nos detenemos a reconocer la vida que habita el entorno,  
          a comprender el equilibrio entre especies  
          y a transformar esa experiencia en creación.
        </p>

        <p className="text-gray-600 leading-relaxed">
          Durante el recorrido, cada persona construye su propia bitácora textil,  
          una forma de llevarse el bosque consigo  
          y compartirlo con otros.
        </p>

        <p className="text-gray-600 leading-relaxed italic">
          Cali es eso: un espacio para crear, aprender y reconectar.
        </p>

      </div>

      {/* 🌿 FOOTER */}
      <div className="border-t py-10 text-center space-y-4 mt-10">

        <p className="text-sm text-gray-500">
          ¿Te gustaría una app para vos?
        </p>

        <a
          href="https://wa.me/5491124604472?text=Hola!%20👋%20Vi%20Cali%20y%20me%20encantó.%20Quisiera%20una%20app%20para%20mi%20proyecto."
          target="_blank"
          className="inline-block text-sm underline text-gray-700"
        >
          Escribinos por WhatsApp
        </a>

      </div>

    </div>
  )
}