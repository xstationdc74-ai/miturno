import { supabase } from "@/lib/supabase/client"
import BusinessQR from "@/components/BusinessQR"
import AdminAgenda from "@/components/AdminAgenda"
import BusinessBannerUpload from "@/components/BusinessBannerUpload"

export default async function Page({
  params,
}: {
  params: Promise<{ business: string }>
}) {

  const { business } = await params

  const { data: biz } = await supabase
    .from("business")
    .select("*")
    .eq("slug", business)
    .single()

  if (!biz) {
    return <div className="p-10">Negocio no encontrado</div>
  }

  return (

    <div className="max-w-md mx-auto mt-10 space-y-10">

      <h1 className="text-2xl font-semibold text-center">
        Panel — {biz.name}
      </h1>

      <BusinessBannerUpload businessId={biz.id} />

      <BusinessQR slug={business} />

      <AdminAgenda businessId={biz.id} />

    </div>

  )

}