"use client"

type Props = {
  name: string
}

export default function BusinessHeader({ name }: Props) {

  return (

    <div className="text-center space-y-3 mb-6">

      <img
        src="/logo-barberia2.png"
        className="w-16 mx-auto"
      />

      <h1 className="text-2xl font-semibold">
        {name}
      </h1>

      <p className="text-gray-500 text-sm">
        Reservá tu turno online
      </p>

    </div>

  )

}