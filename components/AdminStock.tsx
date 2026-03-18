"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"

type Product = {
  id: string
  name: string
  stock: number
}

export default function AdminStock({ businessId }: { businessId: string }) {

  const [products,setProducts] = useState<Product[]>([])

  useEffect(()=>{
    loadProducts()
  },[])

  const loadProducts = async () => {

    const { data } = await supabase
      .from("products")
      .select("id,name,stock")
      .eq("business_id", businessId)

    setProducts(data || [])
  }

  const updateStock = async (id:string, newStock:number) => {

    await supabase
      .from("products")
      .update({ stock: newStock })
      .eq("id", id)

    loadProducts()
  }

  return(

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

  )

}