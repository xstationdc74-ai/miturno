"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"

const BUSINESS_ID = "20ce3f03-7991-423e-8495-d90ed8b1acea"

type Product = {
  id: string
  name: string
  description: string
  image_url: string
  price: number
}

export default function CaliTiendaAdmin() {

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  const [products, setProducts] = useState<Product[]>([])

  const [editingId, setEditingId] = useState<string | null>(null)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [imageUrl, setImageUrl] = useState("")

  const loadProducts = async () => {

    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("business_id", BUSINESS_ID)
      .order("created_at", { ascending: false })

    const formatted = (data || []).map((p: any) => ({
      id: p.id,
      name: p.name,
      description: p.category || "",
      image_url: p.image_url || "/cali-hero.jpg",
      price: p.price || 0,
    }))

    setProducts(formatted)

    setLoading(false)
  }

  useEffect(() => {
    loadProducts()
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
    setPrice("")
    setImageUrl("")
  }

  const handleSave = async () => {

    setSaving(true)

    const payload = {
      business_id: BUSINESS_ID,
      name,
      category: description,
      image_url: imageUrl,
      price: Number(price),
    }

    if (editingId) {

      await supabase
        .from("products")
        .update(payload)
        .eq("id", editingId)

    } else {

      await supabase
        .from("products")
        .insert(payload)

    }

    resetForm()

    await loadProducts()

    setSaving(false)

    alert(
      editingId
        ? "Producto actualizado 🌿"
        : "Producto creado 🌿"
    )
  }

  const handleEdit = (product: Product) => {

    setEditingId(product.id)

    setName(product.name || "")
    setDescription(product.description || "")
    setPrice(String(product.price || ""))
    setImageUrl(product.image_url || "")

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const handleDelete = async (id: string) => {

    const confirmed = confirm(
      "¿Eliminar esta pieza?"
    )

    if (!confirmed) return

    await supabase
      .from("products")
      .delete()
      .eq("id", id)

    await loadProducts()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAF7] text-gray-500 italic font-serif">
        Cargando piezas...
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
              Tienda
            </p>

            <h1 className="text-4xl font-serif italic text-gray-800">
              Gestionar piezas
            </h1>

          </div>

        </div>

        {/* 🌿 FORM */}
        <div className="bg-white rounded-3xl border border-[#E8E5DF] p-8 space-y-6">

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre de la pieza"
            className="w-full border rounded-xl px-4 py-3"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripción"
            className="w-full border rounded-xl px-4 py-3 min-h-[120px]"
          />

          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Precio"
            className="w-full border rounded-xl px-4 py-3"
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

              {uploading ? "Subiendo..." : "Subir imagen 🌿"}

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
              onClick={handleSave}
              disabled={saving}
              className="flex-1 bg-[#7FA6C9] hover:bg-[#6B93B5] text-white py-4 rounded-2xl transition"
            >
              {saving
                ? "Guardando..."
                : editingId
                  ? "Guardar cambios 🌿"
                  : "Crear pieza 🌿"}
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
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">

          {products.map((product) => (

            <div
              key={product.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#E8E5DF]"
            >

              <div className="aspect-square bg-gray-100">

                <img
                  src={product.image_url}
                  className="w-full h-full object-cover"
                />

              </div>

              <div className="p-5 space-y-4">

                <div className="flex items-start justify-between gap-3">

                  <h2 className="font-serif italic text-xl text-gray-800">
                    {product.name}
                  </h2>

                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-[#7FA6C9]/10 hover:bg-[#7FA6C9]/20 text-[#7FA6C9] px-3 py-2 rounded-2xl text-sm transition"
                  >
                    ✏️
                  </button>

                </div>

                <p className="text-sm text-gray-500">
                  {product.description}
                </p>

                <div className="text-[#7FA6C9]">
                  ${product.price}
                </div>

                <button
                  onClick={() => handleDelete(product.id)}
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