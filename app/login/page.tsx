"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function LoginPage(){

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState("")
  const router = useRouter()

  const handleLogin = async () => {

    setLoading(true)
    setError("")

    // 🔴 limpiar sesión anterior SIEMPRE
    await supabase.auth.signOut()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if(error){
      setError(error.message)
      setLoading(false)
      return
    }

    // 🔥 esperar sesión real
    const { data: sessionData } = await supabase.auth.getSession()
    const user = sessionData.session?.user

    if(!user){
      setError("Error al iniciar sesión")
      setLoading(false)
      return
    }

    // 🔥 NUEVO: buscar rol + business
    const { data: relation } = await supabase
      .from("business_users")
      .select("business_id, role")
      .eq("user_id", user.id)
      .single()

    if(!relation){
      router.push("/")
      return
    }

    const { data: business } = await supabase
      .from("business")
      .select("slug")
      .eq("id", relation.business_id)
      .single()

    if(!business){
      router.push("/")
      return
    }

    // 🔥 PRIORIDAD: redirect guardado (si existe)
    const redirectTo = sessionStorage.getItem("redirectAfterLogin")

    if(redirectTo){
      sessionStorage.removeItem("redirectAfterLogin")
      router.push(redirectTo)
      return
    }

    // 🔥 fallback inteligente por rol
    if(relation.role === "admin"){
      router.push(`/admin/${business.slug}`)
    } else {
      router.push(`/${business.slug}/housekeeping`)
    }
  }

  return (
    <div className="p-10 max-w-sm mx-auto space-y-4">

      <h1 className="text-xl font-bold">Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        className="w-full border p-2"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        className="w-full border p-2"
      />

      <button
        onClick={handleLogin}
        disabled={loading}
        className="w-full bg-black text-white p-2"
      >
        {loading ? "Ingresando..." : "Ingresar"}
      </button>

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

    </div>
  )
}