"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import Link from "next/link"
import { useParams } from "next/navigation"

type Product = {
  id: string
  name: string
  stock: number
  price: number
  category?: string
}

type Business = {
  id: string
  name: string
  slug: string
}

const CATEGORIES = ["bebidas","platos","postres"]

export default function Page() {

  const params = useParams()
  const slug = typeof params.slug === "string" ? params.slug : undefined

  const [biz,setBiz] = useState<Business | null>(null)
  const [products,setProducts] = useState<Product[]>([])

  const [newName,setNewName] = useState("")
  const [newPrice,setNewPrice] = useState("")
  const [newStock,setNewStock] = useState("")
  const [newCategory,setNewCategory] = useState("platos")

  useEffect(()=>{
    if(!slug) return
    loadData()
  },[slug])

  const loadData = async () => {

    const { data: bizData } = await supabase
      .from("business")
      .select("*")
      .eq("slug", slug)
      .single()

    if(!bizData) return

    setBiz(bizData)

    const { data: prodData } = await supabase
     .from("products")
.select("*")
.eq("business_id", bizData.id)
.order("category", { ascending: true })
.order("name", { ascending: true })

    setProducts(prodData || [])
  }

  const updateStock = async (id:string, stock:number) => {

    await supabase
      .from("products")
      .update({ stock })
      .eq("id", id)

    setProducts(prev =>
      prev.map(p =>
        p.id === id ? { ...p, stock } : p
      )
    )
  }

  const updateCategory = async (id:string, category:string) => {

    await supabase
      .from("products")
      .update({ category })
      .eq("id", id)

    setProducts(prev =>
      prev.map(p =>
        p.id === id ? { ...p, category } : p
      )
    )
  }

  const deleteProduct = async (id:string) => {

    await supabase
      .from("products")
      .delete()
      .eq("id", id)

    setProducts(prev => prev.filter(p => p.id !== id))
  }

  const addProduct = async () => {

    if(!newName || !newPrice || !biz) return

    const { data } = await supabase
      .from("products")
      .insert({
        business_id: biz.id,
        name: newName,
        price: Number(newPrice),
        stock: Number(newStock || 0),
        category: newCategory
      })
      .select()
      .single()

    if(data){
      setProducts(prev => [...prev, data])
      setNewName("")
      setNewPrice("")
      setNewStock("")
      setNewCategory("platos")
    }
  }

  if (!biz) return <div className="p-10">Cargando...</div>

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">

      <div className="space-y-2">

        <Link
          href={`/resto/${biz.slug}`}
          className="block text-center bg-green-600 text-white py-3 rounded-lg text-sm"
        >
          Volver a comandas
        </Link>

        <Link
          href={`/admin/${biz.slug}`}
          className="block text-center bg-green-600 text-white py-3 rounded-lg text-sm"
        >
          Volver a admin
        </Link>

      </div>

      <h1 className="text-xl font-semibold">
        Stock — {biz.name}
      </h1>

      {/* NUEVO PRODUCTO */}
      <div className="bg-white p-4 rounded-xl border space-y-2">

        <h2 className="text-sm font-semibold">
          Nuevo producto
        </h2>

        <input
          placeholder="Nombre"
          value={newName}
          onChange={e=>setNewName(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg text-sm"
        />

        <input
          placeholder="Precio"
          value={newPrice}
          onChange={e=>setNewPrice(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg text-sm"
        />

        <input
          placeholder="Stock inicial"
          value={newStock}
          onChange={e=>setNewStock(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg text-sm"
        />

        <select
          value={newCategory}
          onChange={e=>setNewCategory(e.target.value)}
          className="w-full border px-3 py-2 rounded-lg text-sm"
        >
          {CATEGORIES.map(c=>(
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <button
          onClick={addProduct}
          className="bg-black text-white px-3 py-2 rounded-lg text-sm"
        >
          Agregar
        </button>

      </div>

      {/* LISTA */}
      <div className="bg-white p-4 rounded-xl border space-y-3">

        {products.map(p=>{

          const low = p.stock <= 2

          return (
            <div key={p.id} className="flex items-center justify-between text-sm">

              <div className="space-y-1">

                <div>{p.name}</div>

                <div className="text-xs text-gray-500">
                  ${p.price}
                </div>

                {/* 💥 EDIT CATEGORY */}
                <select
                  value={p.category || ""}
                  onChange={(e)=>updateCategory(p.id, e.target.value)}
                  className="text-xs border rounded px-2 py-1"
                >
                  <option value="">sin categoría</option>
                  {CATEGORIES.map(c=>(
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>

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

              <div className="flex items-center gap-2">

                <input
                  type="number"
                  value={p.stock ?? 0}
                  onChange={(e)=>updateStock(p.id, Number(e.target.value))}
                  className="w-20 border rounded px-2 py-1 text-sm"
                />

                <button
                  onClick={()=>deleteProduct(p.id)}
                  className="text-xs bg-red-600 text-white px-2 py-1 rounded"
                >
                  X
                </button>

              </div>

            </div>
          )
        })}

      </div>

    </div>
  )
}