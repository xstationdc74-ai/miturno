"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"

const BUSINESS_ID = "20ce3f03-7991-423e-8495-d90ed8b1acea"

export default function CaliAcercaAdmin() {

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  const [id, setId] = useState<string | null>(null)

  const [heroTitle, setHeroTitle] = useState("")
  const [heroSubtitle, setHeroSubtitle] = useState("")
  const [mainText, setMainText] = useState("")
  const [sideText, setSideText] = useState("")
  const [imageUrl, setImageUrl] = useState("")

  useEffect(() => {

    const loadContent = async () => {

      const { data } = await supabase
        .from("about_content")
        .select("*")
        .eq("business_id", BUSINESS_ID)
        .single()

      if (data) {

        setId(data.id)

        setHeroTitle(data.hero_title || "")
        setHeroSubtitle(data.hero_subtitle || "")
        setMainText(data.main_text || "")
        setSideText(data.side_text || "")
        setImageUrl(data.image_url || "")
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

    setImageUrl(publicUrl.publicUrl)

    setUploading(false)
  }

  const handleSave = async () => {

    setSaving(true)

    const payload = {
      business_id: BUSINESS_ID,
      hero_title: heroTitle,
      hero_subtitle: heroSubtitle,
      main_text: mainText,
      side_text: sideText,
      image_url: imageUrl,
    }

    if (id) {

      await supabase
        .from("about_content")
        .update(payload)
        .eq("id", id)

    } else {

      const { data } = await supabase
        .from("about_content")
        .insert(payload)
        .select()
        .single()

      if (data) {
        setId(data.id)
      }
    }

    setSaving(false)

    alert("Acerca de actualizado 🌿")
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

      <div className="max-w-4xl mx-auto space-y-10">

        {/* 🌿 HEADER */}
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
              Acerca de
            </p>

            <h1 className="text-4xl font-serif italic text-gray-800">
              Editar relato editorial
            </h1>

          </div>

        </div>

        {/* 🌿 FORM */}
        <div className="bg-white rounded-3xl border border-[#E8E5DF] p-8 space-y-6">

          <input
            value={heroTitle}
            onChange={(e) => setHeroTitle(e.target.value)}
            placeholder="Título principal"
            className="w-full border rounded-xl px-4 py-3"
          />

          <input
            value={heroSubtitle}
            onChange={(e) => setHeroSubtitle(e.target.value)}
            placeholder="Subtítulo"
            className="w-full border rounded-xl px-4 py-3"
          />

          <textarea
            value={mainText}
            onChange={(e) => setMainText(e.target.value)}
            placeholder="Texto principal"
            className="w-full border rounded-xl px-4 py-3 min-h-[180px]"
          />

          <textarea
            value={sideText}
            onChange={(e) => setSideText(e.target.value)}
            placeholder="Texto lateral"
            className="w-full border rounded-xl px-4 py-3 min-h-[180px]"
          />

          {/* 🌿 IMAGE */}
          <div className="space-y-4">

            {imageUrl && (

              <img
                src={imageUrl}
                className="w-full h-[320px] object-cover rounded-2xl border"
              />

            )}

            <label className="inline-block cursor-pointer bg-[#7FA6C9] hover:bg-[#6B93B5] text-white px-5 py-3 rounded-2xl transition text-sm">

              {uploading ? "Subiendo..." : "Subir imagen 🌿"}

              <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="hidden"
              />

            </label>

          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-[#7FA6C9] hover:bg-[#6B93B5] text-white py-4 rounded-2xl transition"
          >
            {saving
              ? "Guardando..."
              : "Guardar cambios 🌿"}
          </button>

        </div>

      </div>

    </div>
  )
}