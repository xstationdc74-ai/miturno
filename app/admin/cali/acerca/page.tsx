"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"

const BUSINESS_ID =
"20ce3f03-7991-423e-8495-d90ed8b1acea"

export default function CaliAcercaAdmin() {

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  const [id, setId] =
    useState<string | null>(null)

  const [heroTitle, setHeroTitle] =
    useState("")
  const [heroSubtitle, setHeroSubtitle] =
    useState("")
  const [mainText, setMainText] =
    useState("")
  const [sideText, setSideText] =
    useState("")
  const [imageUrl, setImageUrl] =
    useState("")
  const [instagramUrl, setInstagramUrl] =
    useState("")

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
        setInstagramUrl(
          data.instagram_url || ""
        )
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

    const fileName =
      `${Date.now()}-${file.name}`

    const { data, error } =
      await supabase.storage
        .from("business-images")
        .upload(fileName, file)

    if (error) {

      alert("Error subiendo imagen")

      setUploading(false)

      return
    }

    const { data: publicUrl } =
      supabase.storage
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

      instagram_url:
        instagramUrl
    }

    if (id) {

      await supabase
        .from("about_content")
        .update(payload)
        .eq("id", id)

    } else {

      const { data } =
        await supabase
          .from("about_content")
          .insert(payload)
          .select()
          .single()

      if (data)
        setId(data.id)
    }

    setSaving(false)

    alert("Acerca actualizado 🌿")
  }

  if (loading)
    return <div>Cargando...</div>

  return (

    <div className="min-h-screen bg-[#FAFAF7] px-6 py-12">

      <div className="max-w-4xl mx-auto space-y-10">

        <Link
          href="/admin/cali"
          className="inline-block bg-[#7FA6C9] text-white px-4 py-2 rounded-xl"
        >
          ← Volver
        </Link>

        <div className="bg-white rounded-3xl p-8 space-y-6">

          <input
            value={heroTitle}
            onChange={(e)=>
              setHeroTitle(
                e.target.value
              )
            }
            placeholder="Título"
            className="w-full border rounded-xl px-4 py-3"
          />

          <input
            value={heroSubtitle}
            onChange={(e)=>
              setHeroSubtitle(
                e.target.value
              )
            }
            placeholder="Subtítulo"
            className="w-full border rounded-xl px-4 py-3"
          />

          <textarea
            value={mainText}
            onChange={(e)=>
              setMainText(
                e.target.value
              )
            }
            placeholder="Texto principal"
            className="w-full border rounded-xl px-4 py-3"
          />

          <textarea
            value={sideText}
            onChange={(e)=>
              setSideText(
                e.target.value
              )
            }
            placeholder="Texto lateral"
            className="w-full border rounded-xl px-4 py-3"
          />

          <input
            value={instagramUrl}
            onChange={(e)=>
              setInstagramUrl(
                e.target.value
              )
            }
            placeholder="https://instagram..."
            className="w-full border rounded-xl px-4 py-3"
          />

          {imageUrl && (

            <img
              src={imageUrl}
              className="rounded-2xl"
            />

          )}

          <label>

            Subir imagen 🌿

            <input
              type="file"
              hidden
              onChange={handleUpload}
            />

          </label>

          <button
            onClick={handleSave}
            className="w-full bg-[#7FA6C9] text-white py-4 rounded-xl"
          >

            {saving
              ? "Guardando..."
              : "Guardar 🌿"}

          </button>

        </div>

      </div>

    </div>
  )
}