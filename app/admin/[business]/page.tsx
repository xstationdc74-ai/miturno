import BusinessQR from "@/components/BusinessQR"

export default async function Page({
  params,
}: {
  params: Promise<{ business: string }>
}) {

  const { business } = await params

  return (

    <div className="max-w-md mx-auto mt-10 space-y-6">

      <h1 className="text-2xl font-semibold text-center">
        QR del negocio
      </h1>

      <BusinessQR slug={business} />

    </div>

  )

}