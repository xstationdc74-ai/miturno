"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import Link from "next/link"

type Business = {
  id: string
  name: string
  slug: string
  description: string
  cover_image: string
  type: string
}

export default function ExplorarPage() {

  const [businesses, setBusinesses] = useState<Business[]>([])
  const [loading, setLoading] = useState(true)
  const [type, setType] = useState<string | null>(null)

  // 🔥 agarramos el query param SOLO en cliente
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setType(params.get("type"))
  }, [])

  useEffect(() => {
    fetchBusinesses()
  }, [type])

  const fetchBusinesses = async () => {

    setLoading(true)

    let query = supabase.from("business").select("*")

    if (type) {
      query = query.eq("type", type)
    }

    const { data } = await query

    setBusinesses(data || [])
    setLoading(false)
  }

  return (

    <div style={{ maxWidth: 900, margin: "0 auto", padding: 20 }}>

      <h1 style={{ fontSize: 28, fontWeight: "bold", marginBottom: 20 }}>
        Explorar negocios
      </h1>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>

        <Link href="/explorar">
          <button style={{ padding: "8px 14px", background: "#eee", borderRadius: 6 }}>
            Todos
          </button>
        </Link>

        <Link href="/explorar?type=barberia">
          <button style={{ padding: "8px 14px", background: "#eee", borderRadius: 6 }}>
            Barberías
          </button>
        </Link>

        <Link href="/explorar?type=comida">
          <button style={{ padding: "8px 14px", background: "#eee", borderRadius: 6 }}>
            Comida
          </button>
        </Link>

        <Link href="/explorar?type=arte">
          <button style={{ padding: "8px 14px", background: "#eee", borderRadius: 6 }}>
            Arte
          </button>
        </Link>

        <Link href="/explorar?type=bienestar">
          <button style={{ padding: "8px 14px", background: "#eee", borderRadius: 6 }}>
            Bienestar
          </button>
        </Link>

      </div>

      {loading && <p>Cargando...</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: 20,
        }}
      >

        {businesses.map((b) => (
          <Link key={b.id} href={`/book/${b.slug}`}>

            <div
              style={{
                border: "1px solid #ddd",
                borderRadius: 8,
                overflow: "hidden",
                cursor: "pointer",
              }}
            >

              {b.cover_image && (
                <img
                  src={b.cover_image}
                  style={{ width: "100%", height: 160, objectFit: "cover" }}
                />
              )}

              <div style={{ padding: 12 }}>

                <h2 style={{ fontSize: 18, fontWeight: 600 }}>
                  {b.name}
                </h2>

                <p style={{ fontSize: 14, color: "#666" }}>
                  {b.description}
                </p>

                <div
                  style={{
                    marginTop: 6,
                    fontSize: 12,
                    background: "#eee",
                    display: "inline-block",
                    padding: "2px 6px",
                    borderRadius: 4,
                  }}
                >
                  {b.type}
                </div>

              </div>

            </div>

          </Link>
        ))}

      </div>

    </div>
  )
}