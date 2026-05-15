"use client"

import CaliNav from "@/components/cali/CaliNav"
import { useEffect, useMemo, useState } from "react"
import { supabase } from "@/lib/supabase/client"

type GalleryItem = {
  id: string
  title: string
  description: string
  image_url: string
  tag: string
  media_type: string
}

export default function CaliGaleria() {

  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)

  const [selectedTag, setSelectedTag] = useState("all")

  useEffect(() => {

    const loadGallery = async () => {

      const { data } = await supabase
        .from("gallery")
        .select("*")
        .eq("business_id", "20ce3f03-7991-423e-8495-d90ed8b1acea")
        .order("created_at", { ascending: false })

      setItems(data || [])

      setLoading(false)
    }

    loadGallery()

  }, [])

  const tags = useMemo(() => {

    const uniqueTags = items
      .map((item) => item.tag)
      .filter(Boolean)

    return [...new Set(uniqueTags)]

  }, [items])

  const filteredItems = useMemo(() => {

    if (selectedTag === "all") {
      return items
    }

    return items.filter(
      (item) => item.tag === selectedTag
    )

  }, [items, selectedTag])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-gray-500 italic font-serif">
        Cargando galería...
      </div>
    )
  }

  return (

    <div className="min-h-screen bg-white flex flex-col">

      {/* 🌿 NAV */}
      <CaliNav />

      {/* 🌿 HEADER */}
      <div className="text-center py-12 space-y-6">

        <div className="inline-block bg-[#7FA6C9]/30 backdrop-blur-sm px-6 py-2 rounded-xl">

          <h1 className="text-3xl font-serif italic text-gray-800">
            Galería
          </h1>

        </div>

        <p className="text-lg md:text-xl font-serif italic text-gray-600">
          Fragmentos del universo Cali
        </p>

        {/* 🌿 FILTER */}
        {tags.length > 0 && (

          <div>

            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="border border-[#E8E5DF] rounded-2xl px-5 py-3 text-sm"
            >

              <option value="all">
                Todo
              </option>

              {tags.map((tag) => (

                <option
                  key={tag}
                  value={tag}
                >
                  {tag}
                </option>

              ))}

            </select>

          </div>

        )}

      </div>

      {/* 🌿 GRID */}
      <div className="columns-1 sm:columns-2 md:columns-3 gap-6 px-4 max-w-6xl mx-auto w-full pb-20">

        {filteredItems.map((item) => (

          <div
            key={item.id}
            className="mb-6 break-inside-avoid overflow-hidden rounded-3xl bg-white"
          >

            {item.media_type === "video" ? (

              <video
                src={item.image_url}
                controls
                className="w-full rounded-3xl"
              />

            ) : (

              <img
                src={item.image_url}
                className="w-full rounded-3xl object-cover"
              />

            )}

            {(item.title || item.description) && (

              <div className="px-2 py-4 space-y-2">

                {item.title && (

                  <h2 className="font-serif italic text-xl text-gray-800">
                    {item.title}
                  </h2>

                )}

                {item.description && (

                  <p className="text-sm text-gray-500 leading-relaxed">
                    {item.description}
                  </p>

                )}

              </div>

            )}

          </div>

        ))}

      </div>

    </div>
  )
}