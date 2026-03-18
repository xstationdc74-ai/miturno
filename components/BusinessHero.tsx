"use client"

type Business = {
  name: string
  description?: string
  cover_image?: string
}

export default function BusinessHero({ business }: { business: Business }) {

  return (

    <div className="p-6">

      {/* IMAGEN / LOGO */}
      <div className="w-full h-48 bg-gray-200 rounded-xl overflow-hidden mb-4 flex items-center justify-center">

        {business.cover_image ? (
          <img
            src={business.cover_image}
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <div className="text-xs text-gray-400">
            Sin imagen
          </div>
        )}

      </div>

      {/* INFO */}
      <div className="space-y-1">

        <h1 className="text-2xl font-semibold">
          {business.name}
        </h1>

        {business.description && (
          <div className="text-sm text-gray-500">
            {business.description}
          </div>
        )}

      </div>

    </div>

  )

}