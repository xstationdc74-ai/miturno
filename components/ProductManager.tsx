'use client'

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"

type Product = {
  id: string
  name: string
  price: number
}

export default function ProductManager({ businessId }: { businessId: string }){

  const [products,setProducts] = useState<Product[]>([])
  const [name,setName] = useState("")
  const [price,setPrice] = useState("")

  useEffect(()=>{
    load()
  },[])

  const load = async () => {

    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("business_id", businessId)

    setProducts(data || [])
  }

  const addProduct = async () => {

    if(!name || !price) return

    await supabase.from("products").insert({
      business_id: businessId,
      name,
      price: Number(price)
    })

    setName("")
    setPrice("")
    load()
  }

  const deleteProduct = async (id:string) => {

    await supabase
      .from("products")
      .delete()
      .eq("id", id)

    load()
  }

  return(

    <div className="bg-white p-4 rounded-xl border space-y-4">

      <h2 className="text-sm font-semibold">
        Productos
      </h2>

      {/* FORM */}
      <div className="flex gap-2">

        <input
          placeholder="Nombre"
          value={name}
          onChange={e=>setName(e.target.value)}
          className="border px-3 py-2 rounded-lg text-sm w-full"
        />

        <input
          placeholder="$"
          value={price}
          onChange={e=>setPrice(e.target.value)}
          className="border px-3 py-2 rounded-lg text-sm w-24"
        />

        <button
          onClick={addProduct}
          className="bg-green-600 text-white px-4 rounded-lg text-sm"
        >
          +
        </button>

      </div>

      {/* LISTA */}
      <div className="space-y-2">

        {products.map(p=>(
          <div key={p.id} className="flex justify-between text-sm">

            <span>{p.name} — ${p.price}</span>

            <button
              onClick={()=>deleteProduct(p.id)}
              className="text-red-500"
            >
              eliminar
            </button>

          </div>
        ))}

      </div>

    </div>

  )

}