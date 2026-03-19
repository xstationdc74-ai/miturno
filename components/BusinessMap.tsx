"use client"

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import { useEffect } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

// 🔥 FIX DEFINITIVO ICONOS (VERCEL)
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

type Business = {
  name: string
  slug: string
  lat: number | null
  lng: number | null
  cover_image?: string
  type?: string
  description?: string
}

function LocateUser() {

  const map = useMap()

  useEffect(() => {

    if (!navigator.geolocation) return

    navigator.geolocation.getCurrentPosition(

      (pos) => {
        map.setView([pos.coords.latitude, pos.coords.longitude], 15)
      },

      () => {
        map.setView([-40.7612, -71.6463], 15)
      }

    )

  }, [map])

  return null
}

export default function BusinessMap({ businesses }: { businesses: Business[] }) {

  const validBusinesses = businesses.filter(
    (b) => b.lat !== null && b.lng !== null
  )

  return (

    <MapContainer
      center={[-40.7612, -71.6463]}
      zoom={15}
      style={{ height: "70vh", width: "100%" }}
    >

      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <LocateUser />

      {validBusinesses.map((b) => (

        <Marker
          key={b.slug}
          position={[b.lat as number, b.lng as number]}
        >

          <Popup>

            <div className="w-[220px]">

              {/* IMAGEN */}
              <div className="w-full h-28 bg-white rounded-lg overflow-hidden mb-2 flex items-center justify-center">

                {b.cover_image ? (
                  <img
                    src={b.cover_image}
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <div className="text-xs text-gray-400">
                    Sin imagen
                  </div>
                )}

              </div>

              <div className="space-y-1">

                <div className="text-sm font-semibold">
                  {b.name}
                </div>

                {b.type && (
                  <div className="text-xs text-gray-500">
                    {b.type}
                  </div>
                )}

                {b.description && (
                  <div className="text-xs text-gray-500">
                    {b.description}
                  </div>
                )}

              </div>

              <a
                href={`/book/${b.slug}`}
                style={{ color: "#fff", textDecoration: "none" }}
                className="block mt-3 text-center bg-green-600 text-sm py-2 rounded-lg"
              >
                Reservar
              </a>

            </div>

          </Popup>

        </Marker>

      ))}

    </MapContainer>

  )

}