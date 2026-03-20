import { supabase } from "@/lib/supabase/client"
import AdminRestaurant from "@/components/AdminRestaurant"
import CashSummary from "@/components/CashSummary"

export const dynamic = "force-dynamic"

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {

  const { slug } = await params

  const { data: biz } = await supabase
    .from("business")
    .select("*")
    .eq("slug", slug)
    .single()

  if (!biz) {
    return <div className="p-10">Negocio no encontrado</div>
  }

  return (

    <div className="max-w-3xl mx-auto">

      <div className="p-6 space-y-6">

        <div>
          <h1 className="text-2xl font-semibold">
            {biz.name}
          </h1>

          <div className="text-sm text-gray-500">
            Modo mesera
          </div>
        </div>

        <CashSummary businessId={biz.id} />

        <AdminRestaurant
         businessId={biz.id}
         slug={biz.slug}
         />

      </div>

    </div>

  )

}