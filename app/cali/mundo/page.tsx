"use client"

import Link from "next/link"
import CaliNav from "@/components/CaliNav"

export default function CaliMundo() {

  return (
    <div className="min-h-screen bg-white">

      {/* 🌿 NAV GLOBAL */}
      <CaliNav />

      {/* 🌿 HERO */}
      <div className="relative h-[60vh] w-full">

        <img
          src="/cali-textil.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/20" />

        <div className="relative z-10 flex items-center justify-center h-full px-6">

          <div className="bg-black/30 backdrop-blur-sm px-6 py-6 rounded-xl text-white text-center">

            <p className="text-xl md:text-2xl italic font-serif max-w-xl">
              Un universo donde el bosque se vuelve textil
            </p>

          </div>

        </div>

      </div>

      {/* 🌿 SECCIONES */}
      <div className="max-w-5xl mx-auto px-6 py-20 space-y-24">

        {/* 🌿 TEXTILES */}
        <div className="grid md:grid-cols-2 gap-10 items-center">

          <img
            src="/pañuelo de seda-120x40.jpeg"
            className="w-full h-[300px] object-cover rounded-xl"
          />

          <div className="space-y-4 text-center md:text-left">

            <h2 className="text-2xl font-serif text-[#7FA6C9] italic">
              Textiles
            </h2>

            <p className="text-gray-600">
              Pañuelos de seda, pashminas y prendas teñidas con tintas naturales del bosque.
            </p>

            <Link
              href="/cali/galeria"
              className="inline-block mt-2 px-5 py-2 rounded-full text-sm bg-[#7FA6C9] hover:bg-[#6B93B5] text-white transition"
            >
              Ver piezas
            </Link>

          </div>

        </div>

        {/* 🌿 TALLERES */}
        <div className="grid md:grid-cols-2 gap-10 items-center">

          <div className="space-y-4 text-center md:text-left">

            <h2 className="text-2xl font-serif text-[#7FA6C9] italic">
              Talleres
            </h2>

            <p className="text-gray-600">
              Espacios para experimentar con tintes naturales y conectar con los procesos del bosque.
            </p>

            <span className="text-sm text-gray-400">
              Próximamente
            </span>

          </div>

          <img
            src="/tintas-taller.jpeg"
            className="w-full h-[300px] object-cover rounded-xl"
          />

        </div>

        {/* 🌿 ENCUENTROS */}
        <div className="grid md:grid-cols-2 gap-10 items-center">

          <img
            src="/encuentros-cali.jpeg"
            className="w-full h-[300px] object-cover rounded-xl"
          />

          <div className="space-y-4 text-center md:text-left">

            <h2 className="text-2xl font-serif text-[#7FA6C9] italic">
              Encuentros
            </h2>

            <p className="text-gray-600">
              Experiencias compartidas donde arte, naturaleza y comunidad se encuentran.
            </p>

            <span className="text-sm text-gray-400">
              Próximamente
            </span>

          </div>

        </div>

      </div>

    </div>
  )
}