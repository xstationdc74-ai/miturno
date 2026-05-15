"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"

const BUSINESS_ID = "20ce3f03-7991-423e-8495-d90ed8b1acea"

type Experience = {
  id: string
  name: string
  description: string
  date: string
  end_date: string
  capacity: number
  price: number
  image_url: string
  location: string
  type: string
  promo_text: string
  is_active: boolean
}

export default function CaliExperienciasAdmin() {

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  const [experiences, setExperiences] = useState<Experience[]>([])

  const [editingId, setEditingId] = useState<string | null>(null)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [capacity, setCapacity] = useState("")
  const [price, setPrice] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [location, setLocation] = useState("")
  const [type, setType] = useState("taller")
  const [promoText, setPromoText] = useState("")

  const loadExperiences = async () => {

    const { data } = await supabase
      .from("events")
      .select("*")
      .eq("business_id", BUSINESS_ID)
      .order("date", { ascending: true })

    setExperiences(data || [])
    setLoading(false)
  }

  useEffect(() => {
    loadExperiences()
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

  const resetForm = () => {

    setEditingId(null)

    setName("")
    setDescription("")
    setDate("")
    setEndDate("")
    setCapacity("")
    setPrice("")
    setImageUrl("")
    setLocation("")
    setPromoText("")
    setType("taller")
  }

  const handleCreate = async () => {

    setSaving(true)

    const payload = {
      business_id: BUSINESS_ID,
      name,
      description,
      date,
      end_date: endDate || null,
      capacity: Number(capacity),
      price: Number(price),
      image_url: imageUrl,
      location,
      type,
      promo_text: promoText,
      is_active: true,
    }

    if (editingId) {

      await supabase
        .from("events")
        .update(payload)
        .eq("id", editingId)

    } else {

      await supabase
        .from("events")
        .insert(payload)

    }

    resetForm()

    await loadExperiences()

    setSaving(false)

    alert(
      editingId
        ? "Experiencia actualizada 🌿"
        : "Experiencia creada 🌿"
    )
  }

  const handleEdit = (exp: Experience) => {

    setEditingId(exp.id)

    setName(exp.name || "")
    setDescription(exp.description || "")
    setDate(exp.date || "")
    setEndDate(exp.end_date || "")
    setCapacity(String(exp.capacity || ""))
    setPrice(String(exp.price || ""))
    setImageUrl(exp.image_url || "")
    setLocation(exp.location || "")
    setType(exp.type || "taller")
    setPromoText(exp.promo_text || "")

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAF7] text-gray-500 italic font-serif">
        Cargando experiencias...
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
              Experiencias
            </p>

            <h1 className="text-4xl font-serif italic text-gray-800">
              Gestionar experiencias
            </h1>

          </div>

        </div>

        {/* 🌿 FORM */}
        <div className="bg-white rounded-3xl border border-[#E8E5DF] p-8 space-y-6">

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre de la experiencia"
            className="w-full border rounded-xl px-4 py-3"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripción"
            className="w-full border rounded-xl px-4 py-3 min-h-[120px]"
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border rounded-xl px-4 py-3"
          >
            <option value="taller">Taller</option>
            <option value="evento">Evento</option>
            <option value="recorrido">Recorrido</option>
            <option value="encuentro">Encuentro</option>
          </select>

          <div className="space-y-2">

            <label className="text-sm text-gray-500">
              Desde
            </label>

            <input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
            />

          </div>

          <div className="space-y-2">

            <label className="text-sm text-gray-500">
              Hasta
            </label>

            <input
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full border rounded-xl px-4 py-3"
            />

          </div>

          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Ubicación"
            className="w-full border rounded-xl px-4 py-3"
          />

          <input
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            placeholder="Cupos"
            className="w-full border rounded-xl px-4 py-3"
          />

          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Precio"
            className="w-full border rounded-xl px-4 py-3"
          />

          <textarea
            value={promoText}
            onChange={(e) => setPromoText(e.target.value)}
            placeholder="Promo o beneficio opcional"
            className="w-full border rounded-xl px-4 py-3 min-h-[80px]"
          />

          {/* 🌿 IMAGE */}
          <div className="space-y-4">

            {imageUrl && (
              <img
                src={imageUrl}
                className="w-full h-[260px] object-cover rounded-2xl border"
              />
            )}

            <label className="inline-block cursor-pointer bg-[#7FA6C9] hover:bg-[#6B93B5] text-white px-5 py-3 rounded-2xl transition text-sm">

              {uploading ? "Subiendo..." : "Subir flyer 🌿"}

              <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="hidden"
              />

            </label>

          </div>

          <div className="flex gap-4">

            <button
              onClick={handleCreate}
              disabled={saving}
              className="flex-1 bg-[#7FA6C9] hover:bg-[#6B93B5] text-white py-4 rounded-2xl transition"
            >
              {saving
                ? "Guardando..."
                : editingId
                  ? "Guardar cambios 🌿"
                  : "Crear experiencia 🌿"}
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

        {/* 🌿 LISTA */}
        <div className="grid gap-6">

          {experiences.map((exp) => (

            <div
              key={exp.id}
              className="bg-white border border-[#E8E5DF] rounded-3xl overflow-hidden"
            >

              {exp.image_url && (
                <img
                  src={exp.image_url}
                  className="w-full h-[260px] object-cover"
                />
              )}

              <div className="p-6 space-y-4">

                <div className="flex items-start justify-between gap-4">

                  <div>

                    <h2 className="text-2xl font-serif italic text-gray-800">
                      {exp.name}
                    </h2>

                    <div className="text-sm text-[#7FA6C9] capitalize mt-1">
                      {exp.type}
                    </div>

                  </div>

                  <button
                    onClick={() => handleEdit(exp)}
                    className="bg-[#7FA6C9]/10 hover:bg-[#7FA6C9]/20 text-[#7FA6C9] px-4 py-2 rounded-2xl text-sm transition"
                  >
                    ✏️ Editar
                  </button>

                </div>

                <p className="text-gray-600">
                  {exp.description}
                </p>

                <div className="text-sm text-gray-500 space-y-1">

                  <div>
                    📍 {exp.location}
                  </div>

                  <div>
                    👥 {exp.capacity} cupos
                  </div>

                  <div>
                    💰 ${exp.price}
                  </div>

                </div>

                {exp.promo_text && (
                  <div className="bg-[#7FA6C9]/10 text-[#7FA6C9] rounded-2xl px-4 py-3 text-sm">
                    ✨ {exp.promo_text}
                  </div>
                )}

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  )
}