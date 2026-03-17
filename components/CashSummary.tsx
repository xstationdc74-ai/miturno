'use client'

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"

export default function CashSummary({ businessId }: { businessId: string }) {

  const [total,setTotal] = useState(0)
  const [count,setCount] = useState(0)

  useEffect(()=>{
    load()
  },[])

  const load = async () => {

    const today = new Date().toISOString().split("T")[0]

    const { data } = await supabase
      .from("sales")
      .select("*")
      .eq("business_id", businessId)
      .gte("created_at", `${today}T00:00:00`)
      .lte("created_at", `${today}T23:59:59`)

    const sum = data?.reduce((acc,s)=>acc + s.amount,0) || 0

    setTotal(sum)
    setCount(data?.length || 0)
  }

  return(

    <div className="bg-green-50 border border-green-200 p-4 rounded-xl">

      <h2 className="text-sm font-semibold mb-2">
        Caja del día
      </h2>

      <div className="text-2xl font-bold">
        ${total}
      </div>

      <div className="text-xs text-gray-600">
        {count} ventas
      </div>

    </div>

  )

}