'use client'

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"

export default function CashHistory({ businessId }:{ businessId:string }){

  const [data,setData] = useState<any[]>([])

  useEffect(()=>{
    load()
  },[])

  const load = async () => {

    const { data } = await supabase
      .from("cash_closings")
      .select("*")
      .eq("business_id", businessId)
      .order("created_at",{ ascending:false })

    setData(data || [])
  }

  return(

    <div className="bg-white p-4 rounded-xl border space-y-3">

      <h3 className="text-sm font-semibold">
        Historial de cierres
      </h3>

      {data.length === 0 && (
        <div className="text-sm text-gray-400">
          Sin cierres aún
        </div>
      )}

      {data.map(c=>(
        <div
          key={c.id}
          className="flex justify-between text-sm border-b pb-1"
        >
          <span>
            {new Date(c.created_at).toLocaleDateString()}
          </span>

          <span className="font-medium">
            ${c.total}
          </span>
        </div>
      ))}

    </div>

  )

}