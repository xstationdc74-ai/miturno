"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"

type Business = {
  id: string
  name: string
  slug: string
  features: any
}

type BusinessUser = {
  id: string
  user_id: string
  role: string
}

export default function SuperAdminPage(){

  const [businesses,setBusinesses] = useState<Business[]>([])
  const [selectedBusiness,setSelectedBusiness] = useState<Business | null>(null)

  const [newName,setNewName] = useState("")
  const [newSlug,setNewSlug] = useState("")

  const [cta,setCta] = useState("booking")
  const [hasGallery,setHasGallery] = useState(true)
  const [hasBooking,setHasBooking] = useState(true)

  const [userId,setUserId] = useState("")
  const [role,setRole] = useState("admin")
  const [users,setUsers] = useState<BusinessUser[]>([])

  const [message,setMessage] = useState("")

  useEffect(()=>{
    loadBusinesses()
  },[])

  useEffect(()=>{
    if(selectedBusiness){
      loadUsers(selectedBusiness.id)
    }
  },[selectedBusiness])

  const loadBusinesses = async () => {
    const { data } = await supabase
      .from("business")
      .select("*")

    if(data){
      setBusinesses(data)
    }
  }

  const loadUsers = async (businessId:string) => {
    const { data } = await supabase
      .from("business_users")
      .select("*")
      .eq("business_id", businessId)

    if(data){
      setUsers(data)
    }
  }

  const handleSelect = (id:string) => {
    const biz = businesses.find(b => b.id === id)
    if(!biz) return

    setSelectedBusiness(biz)

    const f = biz.features || {}

    setCta(f.cta || "booking")
    setHasGallery(!!f.gallery)
    setHasBooking(!!f.booking)
  }

  // 🔥 CREAR NEGOCIO
  const handleCreateBusiness = async () => {

    const { error } = await supabase
      .from("business")
      .insert({
        name: newName,
        slug: newSlug,
        is_active: true,
        features: {
          booking: ["home"],
          gallery: ["home"],
          _order: ["gallery","booking"],
          cta: "booking"
        }
      })

    if(error){
      setMessage(error.message)
      return
    }

    setMessage("Negocio creado 🚀")
    setNewName("")
    setNewSlug("")

    await loadBusinesses()
  }

  // 🔥 FEATURES
  const handleSaveFeatures = async () => {

    if(!selectedBusiness) return

    const features:any = {
      _order: []
    }

    if(hasGallery){
      features.gallery = ["home"]
      features._order.push("gallery")
    }

    if(hasBooking){
      features.booking = ["home"]
      features._order.push("booking")
    }

    features.cta = cta

    const { error } = await supabase
      .from("business")
      .update({ features })
      .eq("id", selectedBusiness.id)

    if(error){
      setMessage("Error guardando features")
      return
    }

    setMessage("Features guardadas 🚀")

    await loadBusinesses()
  }

  // 🔥 ASIGNAR
  const handleAssign = async () => {

    const { error } = await supabase
      .from("business_users")
      .insert({
        user_id: userId,
        business_id: selectedBusiness?.id,
        role: role
      })

    if(error){
      setMessage("Error asignando")
      return
    }

    setMessage("Usuario asignado")
    setUserId("")

    if(selectedBusiness){
      await loadUsers(selectedBusiness.id)
    }
  }

  // 🔥 ELIMINAR
  const handleRemove = async (id:string) => {

    await supabase
      .from("business_users")
      .delete()
      .eq("id", id)

    if(selectedBusiness){
      await loadUsers(selectedBusiness.id)
    }
  }

  return (
    <div className="p-10 space-y-8 max-w-xl">

      <h1 className="text-2xl font-bold">Superadmin</h1>

      {/* 🔥 CREAR NEGOCIO */}
      <div className="border p-4 space-y-3">
        <h2 className="font-semibold">Crear negocio</h2>

        <input
          placeholder="Nombre"
          value={newName}
          onChange={(e)=>setNewName(e.target.value)}
          className="w-full border p-2"
        />

        <input
          placeholder="Slug"
          value={newSlug}
          onChange={(e)=>setNewSlug(e.target.value)}
          className="w-full border p-2"
        />

        <button
          onClick={handleCreateBusiness}
          className="bg-black text-white px-4 py-2"
        >
          Crear
        </button>
      </div>

      {/* SELECT NEGOCIO */}
      <div>
        <label>Negocio</label>
        <select
          onChange={(e)=>handleSelect(e.target.value)}
          className="w-full border p-2"
        >
          <option value="">Seleccionar</option>
          {businesses.map(b=>(
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      {/* FEATURES */}
      {selectedBusiness && (
        <div className="border p-4 space-y-4">

          <h2 className="font-semibold">
            Features
          </h2>

          <select
            value={cta}
            onChange={(e)=>setCta(e.target.value)}
            className="w-full border p-2"
          >
            <option value="booking">Reservar</option>
            <option value="visit">Visitar</option>
          </select>

          <label className="flex gap-2">
            <input
              type="checkbox"
              checked={hasGallery}
              onChange={()=>setHasGallery(!hasGallery)}
            />
            Gallery
          </label>

          <label className="flex gap-2">
            <input
              type="checkbox"
              checked={hasBooking}
              onChange={()=>setHasBooking(!hasBooking)}
            />
            Booking
          </label>

          <button
            onClick={handleSaveFeatures}
            className="bg-black text-white px-4 py-2"
          >
            Guardar features
          </button>

        </div>
      )}

      {/* USERS */}
      {selectedBusiness && (
        <div className="border p-4 space-y-4">

          <h2 className="font-semibold">Usuarios</h2>

          <input
            placeholder="User ID"
            value={userId}
            onChange={(e)=>setUserId(e.target.value)}
            className="w-full border p-2"
          />

          <select
            value={role}
            onChange={(e)=>setRole(e.target.value)}
            className="w-full border p-2"
          >
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
          </select>

          <button
            onClick={handleAssign}
            className="bg-black text-white px-4 py-2"
          >
            Asignar
          </button>

          {users.map(u=>(
            <div key={u.id} className="flex justify-between border p-2">
              <div>
                <p className="text-sm">{u.user_id}</p>
                <p className="text-xs text-gray-500">{u.role}</p>
              </div>

              <button
                onClick={()=>handleRemove(u.id)}
                className="text-red-500"
              >
                Eliminar
              </button>
            </div>
          ))}

        </div>
      )}

      {message && (
        <p className="text-sm">{message}</p>
      )}

    </div>
  )
}