import { createClient } from "@supabase/supabase-js"
import Link from "next/link"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function Page() {

  const { data } = await supabase
    .from("business")
    .select("name,slug,cover_image,description")

  return (

    <div className="max-w-md mx-auto mt-10 space-y-6">

      <h1 className="text-2xl font-semibold text-center">
        Explorar negocios
      </h1>

      {data?.map((business) => (

        <Link
          key={business.slug}
          href={`/book/${business.slug}`}
          className="block border rounded-xl overflow-hidden"
        >

          {business.cover_image && (

            <img
              src={business.cover_image}
              className="w-full h-32 object-cover"
            />

          )}

          <div className="p-4 space-y-1">

            <h2 className="font-semibold">
              {business.name}
            </h2>

            {business.description && (

              <p className="text-sm text-gray-500">
                {business.description}
              </p>

            )}

          </div>

        </Link>

      ))}

    </div>

  )

}