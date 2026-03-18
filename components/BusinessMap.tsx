"use client"

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import { useEffect } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png"
import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerShadow from "leaflet/dist/images/marker-shadow.png"

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
})

type Business = {
  name: string
  slug: string
  lat: number | null
  lng: number | null
  cover_image?: string
  type?: string
}

function LocateUser() {

  const map = useMap()

  useEffect(() => {

    if (!navigator.geolocation) return

    navigator.geolocation.getCurrentPosition(

      (pos) => {
        const lat = pos.coords.latitude
        const lng = pos.coords.longitude

        if (map) {
          map.setView([lat, lng], 15)
        }
      },

      () => {
        if (map) {
          map.setView([-40.7612, -71.6463], 15)
        }
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

              <div className="w-full h-28 bg-gray-200 rounded-lg overflow-hidden mb-2">
                {b.cover_image ? (
                  <img
                    src={b.cover_image}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
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