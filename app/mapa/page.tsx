"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

// 🔥 FIX ICONOS LEAFLET (CLAVE)
delete (L.Icon.Default.prototype as any)._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
})

type Business = {
  id: string
  name: string
  slug: string
  lat: number
  lng: number
}

export default function Page({ business }: { business: Business[] }) {

  return (
    <MapContainer
      center={[-34.6037, -58.3816]}
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {business.map(b => {

        if (!b.lat || !b.lng) return null

        return (
          <Marker
            key={b.id}
            position={[Number(b.lat), Number(b.lng)]}
          >
            <Popup>
              <div className="text-sm space-y-1">
                <div className="font-semibold">{b.name}</div>

                <a
                  href={`/book/${b.slug}`}
                  className="text-blue-600 underline"
                >
                  Reservar
                </a>
              </div>
            </Popup>
          </Marker>
        )
      })}

    </MapContainer>
  )
}