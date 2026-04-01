'use client'

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function SuperAdminPage(){

  const router = useRouter()

  const [businessList,setBusinessList] = useState<any[]>([])
  const [selectedBusinessId,setSelectedBusinessId] = useState<string | null>(null)

  const [name,setName] = useState("")
  const [slug,setSlug] = useState("")
  const [type,setType] = useState("")

  const [lat,setLat] = useState("")
  const [lng,setLng] = useState("")

  const [coverImage,setCoverImage] = useState("")

  const [hasBooking,setHasBooking] = useState(true)
  const [hasGallery,setHasGallery] = useState(false)
  const [isActive,setIsActive] = useState(true)

  const [gallerySections,setGallerySections] = useState<string[]>([])

  const [loading,setLoading] = useState(false)
  const [uploading,setUploading] = useState(false)

  useEffect(()=>{
    const loadBusinesses = async () => {
      const { data } = await supabase
        .from("business")
        .select("id,name")
        .order("name",{ ascending:true })

      setBusinessList(data || [])
    }

    loadBusinesses()
  },[])

  useEffect(()=>{
    if(!selectedBusinessId) {
      resetForm()
      return
    }

    const load = async () => {
      const { data } = await supabase
        .from("business")
        .select("*")
        .eq("id", selectedBusinessId)
        .single()

      if(!data) return

      setName(data.name || "")
      setSlug(data.slug || "")
      setType(data.type || "")
      setLat(data.lat?.toString() || "")
      setLng(data.lng?.toString() || "")
      setCoverImage(data.cover_image || "")
      setHasBooking(data.has_booking)
      setHasGallery(data.has_gallery)
      setIsActive(data.is_active)
      setGallerySections(data.gallery_sections || [])
    }

    load()
  },[selectedBusinessId])

  const resetForm = () => {
    setName("")
    setSlug("")
    setType("")
    setLat("")
    setLng("")
    setCoverImage("")
    setHasBooking(true)
    setHasGallery(false)
    setIsActive(true)
    setGallerySections([])
  }

  const toggleSection = (section:string) => {
    if(gallerySections.includes(section)){
      setGallerySections(prev => prev.filter(s => s !== section))
    }else{
      setGallerySections(prev => [...prev, section])
    }
  }

  // 🔥 UPLOAD IMAGE
  const handleUpload = async (file: File) => {

    if(!file) return

    setUploading(true)

    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    const filePath = `business/${fileName}`

    const { error } = await supabase.storage
      .from("business-images")
      .upload(filePath, file)

    if(error){
      console.error(error)
      alert("Error subiendo imagen")
      setUploading(false)
      return
    }

    const { data } = supabase.storage
      .from("business-images")
      .getPublicUrl(filePath)

    setCoverImage(data.publicUrl)

    setUploading(false)
  }

  const handleSave = async () => {

    if(!name || !slug) return alert("Faltan datos")

    setLoading(true)
console.log("COVER IMAGE ANTES DE GUARDAR:", coverImage)
console.log("ID QUE SE ESTÁ GUARDANDO:", selectedBusinessId)
    const payload = {
      name,
      slug,
      type,
      lat: lat ? parseFloat(lat) : null,
      lng: lng ? parseFloat(lng) : null,
      cover_image: coverImage || null,
      places: 1,
      has_booking: hasBooking,
      has_gallery: hasGallery,
      is_active: isActive,
      gallery_sections: gallerySections.length ? gallerySections : ['general']
    }

    let error = null

    if(selectedBusinessId){
      const res = await supabase
  .from("business")
  .update(payload)
  .eq("id", selectedBusinessId)
  .select()

console.log("UPDATE RESPONSE:", res)

error = res.error
    }else{
      const res = await supabase
        .from("business")
        .insert(payload)

      error = res.error
    }

    setLoading(false)

    if(error){
      console.error(error)
      return alert("Error al guardar")
    }

    alert(selectedBusinessId ? "Negocio actualizado" : "Negocio creado")
    resetForm()
    setSelectedBusinessId(null)
  }

  return(

    <div className="max-w-xl mx-auto p-6 space-y-6">

      <select
        value={selectedBusinessId || ""}
        onChange={(e)=>{
          const val = e.target.value
          setSelectedBusinessId(val || null)
        }}
        className="w-full h-10 px-3 rounded-lg border text-sm bg-white"
      >
        <option value="">
          ➕ Crear nuevo negocio
        </option>

        {businessList.map(b=>(
          <option key={b.id} value={b.id}>
            {b.name}
          </option>
        ))}
      </select>

      <h1 className="text-xl font-semibold">
        SuperAdmin — {selectedBusinessId ? "Editar negocio" : "Crear negocio"}
      </h1>

      <input
        placeholder="Nombre"
        value={name}
        onChange={e=>setName(e.target.value)}
        className="w-full h-10 px-3 rounded-lg border text-sm"
      />

      <input
        placeholder="Slug"
        value={slug}
        onChange={e=>setSlug(e.target.value)}
        className="w-full h-10 px-3 rounded-lg border text-sm"
      />

      <input
        placeholder="Tipo"
        value={type}
        onChange={e=>setType(e.target.value)}
        className="w-full h-10 px-3 rounded-lg border text-sm"
      />

      <div className="grid grid-cols-2 gap-2">
        <input
          placeholder="Lat"
          value={lat}
          onChange={e=>setLat(e.target.value)}
          className="w-full h-10 px-3 rounded-lg border text-sm"
        />
        <input
          placeholder="Lng"
          value={lng}
          onChange={e=>setLng(e.target.value)}
          className="w-full h-10 px-3 rounded-lg border text-sm"
        />
      </div>

      {/* 🔥 UPLOAD */}
      <div className="space-y-2">

        <label className="w-full h-11 bg-green-600 text-white rounded-lg text-sm flex items-center justify-center cursor-pointer">
  {uploading ? "Subiendo..." : "Seleccionar imagen"}

  <input
    type="file"
    accept="image/*"
    className="hidden"
    onChange={(e)=>{
      if(e.target.files?.[0]){
        handleUpload(e.target.files[0])
      }
    }}
  />
</label>

        {uploading && (
          <div className="text-sm text-gray-500">
            Subiendo imagen...
          </div>
        )}

        {coverImage && (
          <img
            src={coverImage}
            className="w-full h-40 object-cover rounded-lg border"
          />
        )}

      </div>

      <div className="space-y-2 text-sm">

        <label className="flex items-center gap-2">
          <input type="checkbox" checked={hasBooking} onChange={()=>setHasBooking(!hasBooking)} />
          Tiene reservas
        </label>

        <label className="flex items-center gap-2">
          <input type="checkbox" checked={hasGallery} onChange={()=>setHasGallery(!hasGallery)} />
          Tiene galería
        </label>

        <label className="flex items-center gap-2">
          <input type="checkbox" checked={isActive} onChange={()=>setIsActive(!isActive)} />
          Activo
        </label>

      </div>

      <button
        onClick={handleSave}
        disabled={loading}
        className="w-full h-11 bg-green-600 text-white rounded-lg text-sm"
      >
        {loading ? "Guardando..." : selectedBusinessId ? "Guardar cambios" : "Crear negocio"}
      </button>

    </div>

  )

}