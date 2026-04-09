"use client"

import { useEffect, useState, use } from "react"
import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}) {

  const router = useRouter()
  const [loading,setLoading] = useState(true)

  const { slug } = use(params)

  useEffect(()=>{

    const checkAccess = async () => {

      const { data: sessionData } = await supabase.auth.getSession()
      const user = sessionData.session?.user

      // 🔴 NO LOGIN → GUARDAR REDIRECT
      if(!user){
        sessionStorage.setItem("redirectAfterLogin", window.location.pathname)
        router.replace("/login")
        return
      }

      // 🔎 negocio
      const { data: biz } = await supabase
        .from("business")
        .select("id")
        .eq("slug", slug)
        .single()

      if(!biz){
        router.replace("/")
        return
      }

      // 🔐 relación
      const { data: relation } = await supabase
        .from("business_users")
        .select("*")
        .eq("user_id", user.id)
        .eq("business_id", biz.id)
        .single()

      if(!relation){
        router.replace("/")
        return
      }

      // 🔴 ROLE
      if(relation.role !== "admin"){
        alert("No tenés permisos para acceder")
        await supabase.auth.signOut()
        sessionStorage.clear()
        router.replace("/login")
        return
      }

      setLoading(false)
    }

    checkAccess()

  },[slug])

  if(loading){
    return <div className="p-10">Cargando...</div>
  }

  return (
    <div>

      {/* LOGOUT */}
      <div className="p-4 flex justify-end">
        <button
          onClick={async () => {
            await supabase.auth.signOut()
            sessionStorage.clear()
            localStorage.clear()
            window.location.href = "/login"
          }}
          className="text-sm bg-black text-white px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>

      {children}
    </div>
  )
}