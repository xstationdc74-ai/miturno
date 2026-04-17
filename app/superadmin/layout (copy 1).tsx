"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const router = useRouter()
  const [loading,setLoading] = useState(true)

  useEffect(()=>{

    const checkUser = async () => {

      const { data: sessionData } = await supabase.auth.getSession()
      const user = sessionData.session?.user

     

      // 🔴 SI NO HAY USER → LOGIN
      if(!user){
        router.replace("/login")
        return
      }

      // 🔥 EXTRA SEGURIDAD: refrescar sesión real
      const { data: userData } = await supabase.auth.getUser()

      if(!userData.user){
        await supabase.auth.signOut()
        router.replace("/login")
        return
      }

      setLoading(false)
    }

    checkUser()

  },[])

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