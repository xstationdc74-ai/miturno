"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabase/client"

type Business = {
  id: string
  name: string
  description?: string
  cover_image?: string
  phone?: string
  features?: any
}

type Hour = {
  day_of_week: number
  open_time: string
  close_time: string
}

type Service = {
  id: string
  name: string
  duration: number
  price: number
}

type GalleryImage = {
  id: string
  image_url: string
}

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {

  const searchParams = useSearchParams()
  const currentPage = searchParams.get("page") || "home"

  const [slug,setSlug] = useState<string | null>(null)
  const [biz,setBiz] = useState<Business | null>(null)
  const [hours,setHours] = useState<Hour[]>([])
  const [services,setServices] = useState<Service[]>([])
  const [gallery,setGallery] = useState<GalleryImage[]>([])

  const [selectedHour,setSelectedHour] = useState<string | null>(null)
  const [selectedService,setSelectedService] = useState<Service | null>(null)
  const [loading,setLoading] = useState(false)
  const [success,setSuccess] = useState(false)

  const [name,setName] = useState("")
  const [phone,setPhone] = useState("")

  useEffect(()=>{
    const loadParams = async () => {
      const p = await params
      setSlug(p.slug)
    }
    loadParams()
  },[params])

  useEffect(()=>{
    if(!slug) return
    loadData()
  },[slug, currentPage])

  const loadData = async () => {

    const { data: bizData } = await supabase
      .from("business")
      .select("*")
      .eq("slug", slug)
      .single()

    if(!bizData) return

    const parsedBiz = {
      ...bizData,
      features: typeof bizData.features === "string"
        ? JSON.parse(bizData.features)
        : bizData.features
    }

    setBiz(parsedBiz)

    const { data: hoursData } = await supabase
      .from("business_hours")
      .select("*")
      .eq("business_id", bizData.id)

    setHours(hoursData || [])

    const { data: servicesData } = await supabase
      .from("services")
      .select("*")
      .eq("business_id", bizData.id)

    setServices(servicesData || [])

    const { data: galleryData } = await supabase
      .from("gallery")
      .select("*")
      .eq("business_id", bizData.id)
      .eq("section", currentPage)
      .order("created_at",{ ascending:false })

    setGallery(galleryData || [])
  }

  if (!biz) return <div className="p-10">Cargando...</div>

  console.log("CURRENT PAGE:", currentPage)
  console.log("SHOW GALLERY:", biz?.features?.gallery?.includes(currentPage))

  const showBooking = biz.features?.booking?.includes(currentPage)
  const showGallery = biz.features?.gallery?.includes(currentPage)

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">

      {biz.cover_image && (
        <img
          src={biz.cover_image}
          className="w-full h-56 object-contain rounded-xl bg-white"
        />
      )}

      {showGallery && gallery.length > 0 && (
        <div className="grid grid-cols-2 gap-2">
          {gallery.map(img => (
            <img
              key={img.id}
              src={img.image_url}
              className="w-full h-32 object-cover rounded-lg"
            />
          ))}
        </div>
      )}

      <div>
        <h1 className="text-3xl font-bold">{biz.name}</h1>

        {biz.description && (
          <p className="text-sm text-gray-500 mt-1">
            {biz.description}
          </p>
        )}
      </div>

      {showBooking && (
        <>
          <div className="space-y-2">
            <input
              placeholder="Nombre"
              value={name}
              onChange={e=>setName(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg text-sm"
            />
            <input
              placeholder="Teléfono"
              value={phone}
              onChange={e=>setPhone(e.target.value)}
              className="w-full border px-3 py-2 rounded-lg text-sm"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {services.map(s => (
              <button
                key={s.id}
                onClick={()=>setSelectedService(s)}
                className={`px-3 py-2 rounded-lg text-sm border ${
                  selectedService?.id === s.id
                    ? "bg-black text-white"
                    : ""
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {hours.map(h => {
              const label = `${h.open_time} - ${h.close_time}`
              return (
                <button
                  key={h.day_of_week}
                  onClick={()=>setSelectedHour(label)}
                  className={`px-3 py-2 rounded-lg text-sm border ${
                    selectedHour === label
                      ? "bg-black text-white"
                      : ""
                  }`}
                >
                  {label}
                </button>
              )
            })}
          </div>

          <button
            disabled={loading || success}
            onClick={async () => {

              if(!biz.phone){
                alert("Sin teléfono configurado")
                return
              }

              if(!name || !phone || !selectedService || !selectedHour){
                alert("Completá todos los campos")
                return
              }

              setLoading(true)

              await supabase.from("appointments").insert({
                business_id: biz.id,
                service_id: selectedService.id,
                client_name: name,
                client_phone: phone,
                start_time: new Date().toISOString(),
                status: "pending",
                price_snapshot: selectedService.price
              })

              const url = `https://wa.me/${biz.phone}?text=${encodeURIComponent(
                `Reserva en ${biz.name}
Cliente: ${name}
Tel: ${phone}
Servicio: ${selectedService.name}
Horario: ${selectedHour}`
              )}`

              window.open(url, "_blank")

              setSuccess(true)
              setLoading(false)
            }}
            className="w-full bg-green-600 text-white py-3 rounded-lg"
          >
            {loading ? "Enviando..." : success ? "Reserva enviada ✅" : "Reservar"}
          </button>
        </>
      )}

    </div>
  )
}