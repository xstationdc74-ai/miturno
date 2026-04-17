import { createSupabaseServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}) {
  // 🔥 FIX CLAVE
  const { slug } = await params

  const supabase = await createSupabaseServerClient()

  // 🔐 1. Validar sesión
  const {
    data: { session },
  } = await supabase.auth.getSession()

  

  if (!session) {
    
    return redirect("/login")
  }

  // 👤 2. Obtener usuario
  const {
    data: { user },
  } = await supabase.auth.getUser()

  

  if (!user) {
    
    return redirect("/login")
  }


  // 🏢 3. Obtener business_id del usuario
  const { data: businessUser, error: buError } = await supabase
    .from("business_users")
    .select("business_id")
    .eq("user_id", user.id)
    .single()

  

  if (buError || !businessUser) {
   
    return redirect("/login")
  }

  // 🏢 4. Obtener slug del business
  const { data: business, error: bError } = await supabase
    .from("business")
    .select("slug")
    .eq("id", businessUser.business_id)
    .single()

  

  if (bError || !business) {
    
    return redirect("/login")
  }

  // 🔒 5. Validar slug contra URL
  

  if (business.slug !== slug) {
  
    return redirect("/login")
  }

  

  // ✅ 6. Acceso permitido
  return <>{children}</>
}