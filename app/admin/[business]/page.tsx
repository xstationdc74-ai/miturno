import { supabase } from "@/lib/supabase/client"
import AdminAgenda from "@/components/AdminAgenda"
import BusinessBannerUpload from "@/components/BusinessBannerUpload"
import BusinessQR from "@/components/BusinessQR"
import BusinessSettings from "@/components/BusinessSettings"

export const dynamic = "force-dynamic"

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

    <div className="max-w-5xl mx-auto p-6 space-y-8">

      <div>
        <h1 className="text-2xl font-semibold">
          Panel — {biz.name}
        </h1>
        <p className="text-sm text-gray-500">
          Gestioná tu negocio
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="space-y-6">

          <div className="bg-white p-4 rounded-xl border">
            <h2 className="text-sm font-semibold mb-3">
              Configuración
            </h2>
            <BusinessSettings business={biz} />
          </div>

          <div className="bg-white p-4 rounded-xl border">
            <h2 className="text-sm font-semibold mb-3">
              Banner
            </h2>
            <BusinessBannerUpload businessId={biz.id} />
          </div>

        </div>

        <div className="space-y-6">

          <div className="bg-white p-4 rounded-xl border text-center">
            <h2 className="text-sm font-semibold mb-3">
              QR de reservas
            </h2>

            <div className="flex justify-center">
              <BusinessQR slug={biz.slug} />
            </div>

            <p className="text-xs text-gray-500 mt-2">
              Escaneá para reservar turno
            </p>
          </div>

        </div>

      </div>

      <div>
        <AdminAgenda businessId={biz.id} />
      </div>

    </div>

  )
}