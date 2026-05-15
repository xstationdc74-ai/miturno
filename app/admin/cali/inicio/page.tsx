"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import Link from "next/link"

const BUSINESS_ID = "20ce3f03-7991-423e-8495-d90ed8b1acea"

export default function CaliInicioAdmin() {

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  const [contentId, setContentId] = useState<string | null>(null)

  const [heroText, setHeroText] = useState("")
  const [content, setContent] = useState("")
  const [ctaText, setCtaText] = useState("")
  const [heroImage, setHeroImage] = useState("")

  useEffect(() => {

    const loadContent = async () => {

      const { data } = await supabase
        .from("business_content")
        .select("*")
        .eq("business_id", BUSINESS_ID)
        .eq("section", "home")
        .single()

      if (data) {

        setContentId(data.id)

        setHeroText(
          data.hero_text || "Textiles que nacen del bosque"
        )

        setContent(
          data.content || "Un espacio donde la naturaleza, el arte y la experimentación se encuentran."
        )

        setCtaText(
          data.cta_text || "Entrar al mundo Cali"
        )

        setHeroImage(
          data.hero_image || "/cali-hero.jpg"
        )

      } else {

        setHeroText("Textiles que nacen del bosque")

        setContent("Un espacio donde la naturaleza, el arte y la experimentación se encuentran.")

        setCtaText("Entrar al mundo Cali")

        setHeroImage("/cali-hero.jpg")
      }

      setLoading(false)
    }

    loadContent()

  }, [])

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file = e.target.files?.[0]

    if (!file) return

    setUploading(true)

    const fileName = `${Date.now()}-${file.name}`

    const { data, error } = await supabase.storage
      .from("business-images")
      .upload(fileName, file)

    if (error) {
      alert("Error subiendo imagen")
      setUploading(false)
      return
    }

    const { data: publicUrl } = supabase
      .storage
      .from("business-images")
      .getPublicUrl(data.path)

    setHeroImage(publicUrl.publicUrl)

    setUploading(false)
  }

  const handleSave = async () => {

    setSaving(true)

    const payload = {
      business_id: BUSINESS_ID,
      section: "home",
      hero_text: heroText,
      content,
      cta_text: ctaText,
      hero_image: heroImage,
    }

    if (contentId) {

      await supabase
        .from("business_content")
        .update(payload)
        .eq("id", contentId)

    } else {

      const { data } = await supabase
        .from("business_content")
        .insert(payload)
        .select()
        .single()

      if (data) {
        setContentId(data.id)
      }
    }

    setSaving(false)

    alert("Inicio actualizado 🌿")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAF7] text-gray-500 italic font-serif">
        Cargando contenido...
      </div>
    )
  }

  return (

    <div className="min-h-screen bg-[#FAFAF7] px-6 py-12">

      <div className="max-w-3xl mx-auto space-y-8">

        <div className="space-y-5">

  <div className="flex justify-center">

  <Link
    href="/admin/cali"
    className="inline-block px-5 py-3 rounded-2xl text-sm bg-[#7FA6C9] hover:bg-[#6B93B5] text-white transition"
  >
    ← Volver al panel
  </Link>

</div>

  <div className="text-center space-y-3">

    <p className="uppercase tracking-[0.3em] text-sm text-[#7FA6C9]">
      Inicio
    </p>

    <h1 className="text-4xl font-serif italic text-gray-800">
      Editar Landing
    </h1>

  </div>

</div>
        <div className="bg-white rounded-3xl border border-[#E8E5DF] p-8 space-y-6">

          {/* 🌿 FRASE HERO */}
          <div className="space-y-2">

            <label className="text-sm text-gray-500">
              Frase principal
            </label>

            <textarea
              value={heroText}
              onChange={(e) => setHeroText(e.target.value)}
              placeholder="Textiles que nacen del bosque"
              className="w-full border rounded-xl px-4 py-3 min-h-[120px] placeholder:text-gray-300"
            />

          </div>

          {/* 🌿 TEXTO */}
          <div className="space-y-2">

            <label className="text-sm text-gray-500">
              Texto secundario
            </label>

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Un espacio donde la naturaleza, el arte y la experimentación se encuentran."
              className="w-full border rounded-xl px-4 py-3 min-h-[120px] placeholder:text-gray-300"
            />

          </div>

          {/* 🌿 CTA */}
          <div className="space-y-2">

            <label className="text-sm text-gray-500">
              Texto botón
            </label>

            <input
              value={ctaText}
              onChange={(e) => setCtaText(e.target.value)}
              placeholder="Entrar al mundo Cali"
              className="w-full border rounded-xl px-4 py-3 placeholder:text-gray-300"
            />

          </div>

          {/* 🌿 UPLOAD */}
          <div className="space-y-4">

            <label className="text-sm text-gray-500">
              Imagen principal
            </label>

            {heroImage && (
              <img
                src={heroImage}
                className="w-full h-[260px] object-cover rounded-2xl border"
              />
            )}

            <label className="inline-block cursor-pointer bg-[#7FA6C9] hover:bg-[#6B93B5] text-white px-5 py-3 rounded-2xl transition text-sm">

  {uploading ? "Subiendo..." : "Subir nueva imagen 🌿"}

  <input
    type="file"
    accept="image/*"
    onChange={handleUpload}
    className="hidden"
  />

</label>

            {uploading && (
              <p className="text-sm text-gray-400 italic">
                Subiendo imagen...
              </p>
            )}

          </div>

          {/* 🌿 SAVE */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-[#7FA6C9] hover:bg-[#6B93B5] text-white py-4 rounded-2xl transition"
          >
            {saving ? "Guardando..." : "Guardar cambios 🌿"}
          </button>

        </div>

      </div>

    </div>
  )
}