"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"

type Business = {
  name: string
  slug: string
  lat: number
  lng: number
}

const BusinessMap = dynamic(
  () => import("@/components/BusinessMap"),
  { ssr: false }
)

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Page() {

  const [businesses, setBusinesses] = useState<Business[]>([])

  useEffect(() => {

    const load = async () => {

      const { data } = await supabase
        .from("business")
        .select("name,slug,lat,lng")
        .not("lat","is",null)
        .not("lng","is",null)

      setBusinesses((data as Business[]) || [])

    }

    load()

  }, [])

  return (

    <div className="max-w-4xl mx-auto mt-10 space-y-6">

      <h1 className="text-2xl font-semibold text-center">
        Negocios cerca tuyo
      </h1>

      <BusinessMap businesses={businesses} />

    </div>

  )

}
