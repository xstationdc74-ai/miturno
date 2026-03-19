"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"

type Product = {
  id: string
  name: string
  stock: number
}

type Business = {
  id: string
  phone?: string
}

export default function AdminStock({ businessId }: { businessId: string }) {

  const [products,setProducts] = useState<Product[]>([])
  const [phone,setPhone] = useState("")
  const [message,setMessage] = useState<string | null>(null)

  useEffect(()=>{
    loadData()
  },[])

  const loadData = async () => {

    const { data: prodData } = await supabase
      .from("products")
      .select("id,name,stock")
      .eq("business_id", businessId)

    setProducts(prodData || [])

    const { data: biz } = await supabase
      .from("business")
      .select("phone")
      .eq("id", businessId)
      .single()

    if (biz?.phone) setPhone(biz.phone)
  }

  const updateStock = async (id:string, newStock:number) => {

    await supabase
      .from("products")
      .update({ stock: newStock })
      .eq("id", id)

    loadData()
  }

  const savePhone = async () => {

    await supabase
      .from("business")
      .update({ phone })
      .eq("id", businessId)

    setMessage("Teléfono guardado ✅")
    setTimeout(()=>setMessage(null),2000)
  }

  return(

    <div className="space-y-6">

      {/* 🔥 TELÉFONO RESERVAS */}
      <div className="bg-white p-4 rounded-xl border space-y-2">

        <h3 className="text-sm font-semibold">
          Teléfono de reservas (WhatsApp)
        </h3>

        <input
          value={phone}
          onChange={(e)=>setPhone(e.target.value)}
          placeholder="549XXXXXXXXXX"
          className="border px-3 py-2 rounded-lg text-sm w-full"
        />

        <button
          onClick={savePhone}
          className="bg-black text-white px-3 py-2 rounded-lg text-sm"
        >
          Guardar
        </button>

        {message && (
          <div className="text-xs text-green-600">
            {message}
          </div>
        )}

      </div>

      {/* STOCK */}
      <div className="bg-white p-4 rounded-xl border space-y-3">

        <h3 className="text-sm font-semibold">
          Stock
        </h3>

        {products.map(p=>{

          const low = p.stock <= 2

          return (
            <div key={p.id} className="flex items-center justify-between text-sm">

              <div>
                <div>{p.name}</div>
                <div className={`text-xs ${
                  p.stock === 0
                    ? "text-red-600"
                    : low
                      ? "text-yellow-600"
                      : "text-green-600"
                }`}>
                  {p.stock === 0
                    ? "Sin stock"
                    : `Stock: ${p.stock}`}
                </div>
              </div>

              <input
                type="number"
                value={p.stock}
                onChange={(e)=>updateStock(p.id, Number(e.target.value))}
                className="w-16 border rounded px-2 py-1 text-sm"
              />

            </div>
          )
        })}

      </div>

    </div>

  )

}