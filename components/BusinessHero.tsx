"use client"

type Props = {
  name: string
  description?: string
  image?: string
}

export default function BusinessHero({
  name,
  description,
  image,
}: Props) {

  return (

    <div className="space-y-4">

      {image && (
        <img
          src={image}
          className="w-full h-48 object-cover rounded-xl"
        />
      )}

      <div className="text-center space-y-2">

        <h1 className="text-2xl font-semibold">
          {name}
        </h1>

        {description && (
          <p className="text-sm text-gray-500">
            {description}
          </p>
        )}

      </div>

    </div>

  )

}