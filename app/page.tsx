import { supabase } from "@/lib/supabase/client"
import dynamicImport from "next/dynamic"
import Link from "next/link"

const BusinessMapClient = dynamicImport(
  () => import("@/components/BusinessMapClient"),
  { ssr: false }
)

export const dynamic = "force-dynamic"

export default async function Page() {

  const { data } = await supabase
    .from("business")
    .select("*")

  const businesses = data || []

  return (

    <div className="flex flex-col">

      <section className="text-center py-8 px-6">

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Descubrí lugares para disfrutar
        </h1>

        <p className="text-gray-600 mt-2">
          Experiencias, comida y bienestar cerca tuyo
        </p>

        <div className="flex justify-center gap-3 mt-4">

          <Link
            href="/explorar"
            className="bg-green-600 text-white px-5 py-2 rounded-lg text-sm font-medium"
          >
            Explorar
          </Link>

        </div>

      </section>

      <section className="h-[75vh]">

        <BusinessMapClient businesses={businesses} />

      </section>

    </div>

  )
}