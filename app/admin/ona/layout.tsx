import { createSupabaseServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
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

  // 🏢 3. Obtener business del usuario
  const { data: businessUser, error: buError } = await supabase
    .from("business_users")
    .select("business_id, role")
    .eq("user_id", user.id)
    .single()

  if (buError || !businessUser) {
    return redirect("/login")
  }

  // 🔒 4. Validar que sea admin
  if (businessUser.role !== "admin") {
    return redirect("/login")
  }

  // ✅ acceso permitido
  return <>{children}</>
}