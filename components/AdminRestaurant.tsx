'use client'

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import Link from "next/link"

export default function AdminRestaurant({
  businessId,
  slug
}:{
  businessId:string
  slug?:string
}){

  const [products,setProducts] = useState<any[]>([])
  const [orders,setOrders] = useState<any[]>([])
  const [orderItems,setOrderItems] = useState<any[]>([])
  const [currentItems,setCurrentItems] = useState<any[]>([])
  const [category,setCategory] = useState("bebidas")
  const [table,setTable] = useState(1)
  const [payment,setPayment] = useState("cash")
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
    loadProducts()
    loadOrders()
  },[])

  const loadProducts = async () => {
    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("business_id", businessId)

    setProducts(data || [])
  }

  const loadOrders = async () => {

    const { data: ordersData } = await supabase
      .from("orders")
      .select("*")
      .eq("business_id", businessId)
      .order("created_at",{ascending:false})

    const { data: itemsData } = await supabase
      .from("order_items")
      .select("*, products(name)")

    setOrders(ordersData || [])
    setOrderItems(itemsData || [])
  }

  const addItem = async (p:any) => {

    // 🔥 bajar stock al agregar
    await adjustStock(p.id, -1)

    setCurrentItems(prev => {

      const exists = prev.find(i=>i.product_id === p.id)

      if(exists){
        return prev.map(i =>
          i.product_id === p.id
            ? {...i, quantity:i.quantity+1}
            : i
        )
      }

      return [...prev,{
        product_id:p.id,
        name:p.name,
        price:p.price,
        quantity:1
      }]
    })
  }

  const adjustStock = async (productId:string, delta:number) => {

    const product = products.find(p => p.id === productId)
    if(!product) return

    const newStock = (product.stock || 0) + delta

    await supabase
      .from("products")
      .update({ stock: newStock })
      .eq("id", productId)

    setProducts(prev =>
      prev.map(p =>
        p.id === productId ? { ...p, stock: newStock } : p
      )
    )
  }

  const total = currentItems.reduce((acc,i)=>acc + i.price * i.quantity,0)

  const handleCloseOrder = async () => {

    if(currentItems.length === 0) return

    setLoading(true)

    const { data: order } = await supabase
      .from("orders")
      .insert({
        business_id: businessId,
        table_number: table,
        payment_method: payment,
        status: "closed"
      })
      .select()
      .single()

    const items = currentItems.map(i => ({
      order_id: order.id,
      product_id: i.product_id,
      quantity: i.quantity,
      price: i.price
    }))

    await supabase.from("order_items").insert(items)

    await supabase.from("sales").insert({
      business_id: businessId,
      amount: total,
      payment_method: payment
    })

    setCurrentItems([])
    setLoading(false)

    loadProducts()
    loadOrders()
  }

  const reopenOrder = async (orderId:string) => {

    const ok = confirm("¿Reabrir esta cuenta?")
    if(!ok) return

    await supabase
      .from("orders")
      .update({ status: "open" })
      .eq("id", orderId)

    const items = orderItems
      .filter(i => i.order_id === orderId)
      .map(i => ({
        product_id: i.product_id,
        name: i.products?.name,
        price: i.price,
        quantity: i.quantity
      }))

    setCurrentItems(items)

    window.scrollTo({ top: 0, behavior: "smooth" })

    loadOrders()
  }

 const filteredProducts = products.filter(
  p => p.category === category && p.stock > 0
)

  return(

    <div className="space-y-6">

      {slug && (
        <Link
          href={`/resto/${slug}/stock`}
          className="block text-center bg-green-600 text-white py-3 rounded-lg text-sm"
        >
          Gestionar stock
        </Link>
      )}

      <select
        value={payment}
        onChange={(e)=>setPayment(e.target.value)}
        className="w-full border p-2 rounded-lg"
      >
        <option value="cash">Efectivo</option>
        <option value="card">Tarjeta</option>
        <option value="wallet">Wallet</option>
      </select>

      <div className="grid grid-cols-2 gap-3">

        {filteredProducts.map(p => {

          const noStock = p.stock === 0

          return (
            <button
              key={p.id}
              onClick={() => addItem(p)}
              disabled={noStock}
              className={`p-4 rounded-xl text-left ${noStock ? "bg-gray-200" : "bg-white shadow"}`}
            >
              <div className="font-semibold">{p.name}</div>
              <div className="text-sm">${p.price}</div>
            </button>
          )
        })}

      </div>

      <div className="bg-white p-4 rounded-xl border space-y-2">

        {currentItems.map(i=>(
          <div key={i.product_id} className="flex justify-between items-center text-sm">

            <span className="flex-1">{i.name}</span>

            <div className="flex items-center gap-2">

              <button
                onClick={()=>{
                  adjustStock(i.product_id, +1)

                  setCurrentItems(prev =>
                    prev
                      .map(item =>
                        item.product_id === i.product_id
                          ? {...item, quantity: item.quantity - 1}
                          : item
                      )
                      .filter(item => item.quantity > 0)
                  )
                }}
                className="bg-gray-200 px-2 rounded"
              >
                -
              </button>

              <span>{i.quantity}</span>

              <button
                onClick={()=>{
                  adjustStock(i.product_id, -1)

                  setCurrentItems(prev =>
                    prev.map(item =>
                      item.product_id === i.product_id
                        ? {...item, quantity: item.quantity + 1}
                        : item
                    )
                  )
                }}
                className="bg-gray-200 px-2 rounded"
              >
                +
              </button>

              <button
                onClick={()=>{
                  adjustStock(i.product_id, i.quantity)

                  setCurrentItems(prev =>
                    prev.filter(item => item.product_id !== i.product_id)
                  )
                }}
                className="bg-red-500 text-white px-2 rounded"
              >
                x
              </button>

            </div>

            <span className="w-16 text-right">
              ${i.price * i.quantity}
            </span>

          </div>
        ))}

        <div className="font-semibold flex justify-between">
          <span>Total</span>
          <span>${total}</span>
        </div>

      </div>

      <button
        onClick={handleCloseOrder}
        disabled={loading}
        className="w-full bg-green-600 text-white py-3 rounded-lg"
      >
        Cerrar cuenta
      </button>

      <div className="space-y-2">

        {orders.map(o=>{

          const items = orderItems.filter(i=>i.order_id === o.id)

          return (
            <div key={o.id} className="border p-3 rounded-lg text-sm space-y-1">

              <div className="flex justify-between">
                <span>Mesa {o.table_number}</span>
                <span>{o.payment_method}</span>
              </div>

              {items.map(i=>(
                <div key={i.id} className="flex justify-between text-xs">
                  <span>{i.products?.name} x{i.quantity}</span>
                  <span>${i.price * i.quantity}</span>
                </div>
              ))}

              {o.status === "closed" && (
                <button
                  onClick={()=>reopenOrder(o.id)}
                  className="bg-green-600 text-white px-2 py-1 rounded text-xs mt-1"
                >
                  Reabrir cuenta
                </button>
              )}

            </div>
          )
        })}

      </div>

    </div>

  )

}