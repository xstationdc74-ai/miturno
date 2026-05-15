"use client"

import { useEffect, useState } from "react"
import { getUserBusinessRole } from "@/lib/auth"
import Link from "next/link"
import CaliNav from "@/components/cali/CaliNav"

const MODULES = [
  {
    title: "Inicio",
    icon: "🌿",
    description: "Editar portada, frases e imágenes principales",
    href: "/admin/cali/inicio",
  },
  {
    title: "Experiencias",
    icon: "✨",
    description: "Gestionar talleres, recorridos y encuentros",
    href: "/admin/cali/experiencias",
  },
  {
    title: "Tienda",
    icon: "🛍️",
    description: "Administrar piezas textiles y productos",
    href: "/admin/cali/tienda",
  },
  {
    title: "Galería",
    icon: "🎨",
    description: "Editar imágenes y recorridos visuales",
    href: "/admin/cali/galeria",
  },
  {
    title: "Acerca de",
    icon: "🌱",
    description: "Actualizar biografía y textos editoriales",
    href: "/admin/cali/acerca",
  },
  {
    title: "Parcela 11",
    icon: "📍",
    description: "Gestionar contenido del espacio y vivero",
    href: "/admin/cali/parcela11",
  },
]

export default function CaliAdminPage() {

  const [loading, setLoading] = useState(true)
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {

    const checkAccess = async () => {

      const { user, role } = await getUserBusinessRole("cali")

      if (!user) {
        window.location.href = "/login"
        return
      }

      if (role !== "admin") {
        window.location.href = "/cali"
        return
      }

      setAuthorized(true)
      setLoading(false)
    }

    checkAccess()

  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-gray-500 italic font-serif">
        Entrando al universo Cali...
      </div>
    )
  }

  if (!authorized) return null

  return (

    <div className="min-h-screen bg-[#FAFAF7]">

      {/* 🌿 NAV */}
      <CaliNav />

      {/* 🌿 HEADER */}
      <div className="max-w-5xl mx-auto px-6 pt-16 pb-10 text-center space-y-5">

        <p className="text-sm tracking-[0.3em] uppercase text-[#7FA6C9]">
          Panel creativo
        </p>

        <h1 className="text-4xl md:text-5xl font-serif italic text-gray-800">
          Universo Cali
        </h1>

        <p className="max-w-2xl mx-auto text-gray-600 leading-relaxed">
          Un espacio para gestionar experiencias, piezas, imágenes y relatos
          que nacen del bosque.
        </p>

      </div>

      {/* 🌿 MODULOS */}
      <div className="max-w-5xl mx-auto px-6 pb-20">

        <div className="grid md:grid-cols-2 gap-6">

          {MODULES.map((module) => (

            <Link
  href={module.href || "#"}
  key={module.title}
  className="bg-white border border-[#E8E5DF] rounded-3xl p-8 text-left hover:shadow-md transition duration-300 group block"
>

              <div className="text-4xl mb-5">
                {module.icon}
              </div>

              <h2 className="text-2xl font-serif italic text-gray-800 group-hover:text-[#7FA6C9] transition">
                {module.title}
              </h2>

              <p className="text-gray-500 mt-3 leading-relaxed text-sm">
                {module.description}
              </p>

            </Link>

          ))}

        </div>

      </div>

    </div>

  )
}