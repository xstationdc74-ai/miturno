"use client"

import { useEffect, useState } from "react"

type Props = {
  slug: string
}

export default function FavoriteBusiness({ slug }: Props) {

  const [saved, setSaved] = useState(false)

  useEffect(() => {

    const fav = localStorage.getItem("favoriteBusiness")

    if (fav === slug) {
      setSaved(true)
    }

  }, [slug])

  const saveBusiness = () => {

    localStorage.setItem("favoriteBusiness", slug)
    setSaved(true)

  }

  if (saved) {
    return (
      <p className="text-sm text-green-600 text-center">
        ⭐ Barbería guardada en tu teléfono
      </p>
    )
  }

  return (

    <div className="text-center">

      <button
        onClick={saveBusiness}
        className="text-sm underline"
      >
        ⭐ Guardar esta barbería
      </button>

    </div>

  )

}