"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"

const BUSINESS_ID = "20ce3f03-7991-423e-8495-d90ed8b1acea"

type GalleryItem = {
  id: string
  title: string
  description: string
  image_url: string
  tag: string
  media_type: string
}

export default function CaliGaleriaAdmin() {

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  const [items, setItems] = useState<GalleryItem[]>([])

  const [editingId, setEditingId] = useState<string | null>(null)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tag, setTag] = useState("")
  const [mediaType, setMediaType] = useState("image")
  const [imageUrl, setImageUrl] = useState("")

  const loadGallery = async () => {

  setLoading(true)

  const { data } = await supabase
    .from("gallery")
    .select("*")
    .eq("business_id", BUSINESS_ID)
    .order("created_at", { ascending: false })

  setItems(data || [])

  setLoading(false)
}

  useEffect(() => {
    loadGallery()
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
      alert("Error subiendo archivo")
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

  const resetForm = () => {

    setEditingId(null)

    setTitle("")
    setDescription("")
    setTag("")
    setMediaType("image")
    setImageUrl("")
  }

  const handleSave = async () => {

    setSaving(true)

    const payload = {
      business_id: BUSINESS_ID,
      title,
      description,
      tag,
      media_type: mediaType,
      image_url: imageUrl,
      section: "general",
    }

    if (editingId) {

      await supabase
        .from("gallery")
        .update(payload)
        .eq("id", editingId)

    } else {

      await supabase
        .from("gallery")
        .insert(payload)

    }

    resetForm()

    await loadGallery()

    setSaving(false)

    alert(
      editingId
        ? "Galería actualizada 🌿"
        : "Contenido agregado 🌿"
    )
  }

  const handleEdit = (item: GalleryItem) => {

    setEditingId(item.id)

    setTitle(item.title || "")
    setDescription(item.description || "")
    setTag(item.tag || "")
    setMediaType(item.media_type || "image")
    setImageUrl(item.image_url || "")

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const handleDelete = async (id: string) => {

    const confirmed = confirm(
      "¿Eliminar este contenido?"
    )

    if (!confirmed) return

    await supabase
      .from("gallery")
      .delete()
      .eq("id", id)

    await loadGallery()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAF7] text-gray-500 italic font-serif">
        Cargando galería...
      </div>
    )
  }

  return (

    <div className="min-h-screen bg-[#FAFAF7] px-6 py-12">

      <div className="max-w-5xl mx-auto space-y-10">

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
              Galería
            </p>

            <h1 className="text-4xl font-serif italic text-gray-800">
              Gestionar contenido visual
            </h1>

          </div>

        </div>

        {/* 🌿 FORM */}
        <div className="bg-white rounded-3xl border border-[#E8E5DF] p-8 space-y-6">

          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título"
            className="w-full border rounded-xl px-4 py-3"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripción o relato"
            className="w-full border rounded-xl px-4 py-3 min-h-[120px]"
          />

          <input
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="Tag (ej: pañuelos, bosque, tintes)"
            className="w-full border rounded-xl px-4 py-3"
          />

          <select
            value={mediaType}
            onChange={(e) => setMediaType(e.target.value)}
            className="w-full border rounded-xl px-4 py-3"
          >
            <option value="image">
              Imagen
            </option>

            <option value="video">
              Video
            </option>
          </select>

          {/* 🌿 IMAGE */}
          <div className="space-y-4">

            {imageUrl && (

              mediaType === "video" ? (

                <video
                  src={imageUrl}
                  controls
                  className="w-full rounded-2xl border"
                />

              ) : (

                <img
                  src={imageUrl}
                  className="w-full h-[260px] object-cover rounded-2xl border"
                />

              )

            )}

            <label className="inline-block cursor-pointer bg-[#7FA6C9] hover:bg-[#6B93B5] text-white px-5 py-3 rounded-2xl transition text-sm">

              {uploading ? "Subiendo..." : "Subir contenido 🌿"}

              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleUpload}
                className="hidden"
              />

            </label>

          </div>

          <div className="flex gap-4">

            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 bg-[#7FA6C9] hover:bg-[#6B93B5] text-white py-4 rounded-2xl transition"
            >
              {saving
                ? "Guardando..."
                : editingId
                  ? "Guardar cambios 🌿"
                  : "Agregar contenido 🌿"}
            </button>

            {editingId && (

              <button
                onClick={resetForm}
                className="px-6 py-4 rounded-2xl border border-[#E8E5DF] hover:bg-gray-50 transition"
              >
                Cancelar
              </button>

            )}

          </div>

        </div>

        {/* 🌿 GRID */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">

          {items.map((item) => (

            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#E8E5DF]"
            >

              <div className="aspect-square bg-gray-100">

                {item.media_type === "video" ? (

                  <video
                    src={item.image_url}
                    controls
                    className="w-full h-full object-cover"
                  />

                ) : (

                 <>
  {item.image_url && (
    <img
      src={item.image_url}
      className="w-full h-full object-cover"
    />
  )}
</>

                )}

              </div>

              <div className="p-5 space-y-4">

                <div className="flex items-start justify-between gap-3">

                  <div>

                    <h2 className="font-serif italic text-xl text-gray-800">
                      {item.title}
                    </h2>

                    <div className="text-xs text-[#7FA6C9] mt-1">
                      #{item.tag}
                    </div>

                  </div>

                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-[#7FA6C9]/10 hover:bg-[#7FA6C9]/20 text-[#7FA6C9] px-3 py-2 rounded-2xl text-sm transition"
                  >
                    ✏️
                  </button>

                </div>

                <p className="text-sm text-gray-500">
                  {item.description}
                </p>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="w-full border border-red-200 text-red-400 hover:bg-red-50 py-2 rounded-2xl text-sm transition"
                >
                  Eliminar
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}