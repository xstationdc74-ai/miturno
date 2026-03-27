'use client'

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { useParams } from "next/navigation"
import Gallery from "@/components/Gallery"

type Business = {
  id: string
  name: string
  gallery_pages?: string[]
}

type Content = {
  hero_image?: string
  hero_text?: string
}

type Event = {
  id: string
  name: string
  date: string
  end_date: string
  price: number
  capacity: number
}

export default function ResidenciaDetailPage(){

  const params = useParams()
  const slug = params.slug as string

  const [biz,setBiz] = useState<Business | null>(null)
  const [content,setContent] = useState<Content | null>(null)
  const [events,setEvents] = useState<Event[]>([])
  const [reservations,setReservations] = useState<any[]>([])

  useEffect(()=>{
    load()
  },[])

  const load = async () => {

    const { data } = await supabase
      .from("business")
      .select("*")
      .eq("slug", slug)
      .single()

    if(data){
      setBiz(data)

      const { data: contentData } = await supabase
        .from("business_content")
        .select("*")
        .eq("business_id", data.id)
        .eq("section", "residencia")
        .single()

      setContent(contentData || null)

      const { data: eventsData } = await supabase
        .from("events")
        .select("*")
        .eq("business_id", data.id)
        .order("date", { ascending: true })

      setEvents(eventsData || [])

      const { data: reservationsData } = await supabase
        .from("appointments")
        .select("*")
        .eq("business_id", data.id)

      setReservations(reservationsData || [])
    }
  }

  const formatDate = (date:string) => {
    return new Date(date).toLocaleDateString("es-AR", {
      day: "numeric",
      month: "short"
    })
  }

  const bookEvent = async (eventId:string, capacity:number) => {

    const reserved = reservations.filter(r => r.event_id === eventId).length

    if(reserved >= capacity){
      alert("Evento completo")
      return
    }

    const name = prompt("Tu nombre")
    if(!name) return

    const phone = prompt("Tu teléfono")
    if(!phone) return

    const { error } = await supabase
      .from("appointments")
      .insert({
        business_id: biz?.id,
        client_name: name,
        client_phone: phone,
        status: "pending",
        event_id: eventId
      })

    if(error){
      console.error(error)
      alert("Error al reservar")
      return
    }

    alert("Reserva confirmada 🚀")
    load()
  }

  if(!biz){
    return <div className="p-10">Cargando...</div>
  }

  const galleryIndex = (biz as any).gallery_pages?.findIndex(
    (p:string)=>p==="residencia"
  )

  const gallerySection =
    galleryIndex !== -1 ? `gallery_${galleryIndex+1}` : null

  return(

    <div className="max-w-4xl mx-auto pb-10">

      {/* HERO */}
      {content?.hero_image && (
        <div className="w-full h-56 md:h-72 overflow-hidden">
          <img
            src={content.hero_image}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* TITULO + TEXTO */}
      <div className="px-6 pt-6 text-center space-y-4">

        <h1 className="text-3xl font-semibold">
          Residencia
        </h1>

        {content?.hero_text && (
          <p className="text-sm text-gray-600 max-w-xl mx-auto">
            {content.hero_text}
          </p>
        )}

      </div>

      {/* GALERÍA */}
      <div className="px-6 mt-6">

        {gallerySection && (
          <Gallery
            businessId={biz.id}
            section={gallerySection}
          />
        )}

      </div>

      {/* EVENTOS */}
      <div className="px-6 mt-8 space-y-3">

        <h2 className="text-lg font-semibold">
          Próximas experiencias
        </h2>

        {events.length === 0 && (
          <div className="text-sm text-gray-400">
            No hay eventos disponibles
          </div>
        )}

        {events.map(e => {

          const reserved = reservations.filter(r => r.event_id === e.id).length
          const available = e.capacity - reserved

          return (
            <div
              key={e.id}
              className="border rounded-xl p-4 space-y-2"
            >

              <div className="font-medium">
                {e.name}
              </div>

              <div className="text-sm text-gray-500">
                {formatDate(e.date)} → {formatDate(e.end_date)}
              </div>

              <div className="text-sm">
                💰 ${e.price.toLocaleString()}
              </div>

              <div className="text-sm">

                {available > 0 ? (
                  <>
                    <div className="text-gray-600">
                      Quedan {available} lugares
                    </div>

                    {available <= 3 && (
                      <div className="text-red-500 text-xs font-semibold">
                        🔥 Últimos lugares
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-red-500 font-semibold">
                    Evento completo
                  </div>
                )}

              </div>

              <button
                onClick={()=>bookEvent(e.id, e.capacity)}
                disabled={available <= 0}
                className={`mt-2 w-full py-2 rounded-lg text-sm ${
                  available > 0
                    ? "bg-green-600 text-white"
                    : "bg-gray-300 text-gray-500"
                }`}
              >
                {available > 0 ? "Reservar lugar" : "Completo"}
              </button>

            </div>
          )

        })}

      </div>

    </div>

  )

}