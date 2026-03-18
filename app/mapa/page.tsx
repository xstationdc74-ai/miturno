"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"

type Business = {
  id: string
  name: string
  slug: string
  lat: number
  lng: number
}

export default function Map({ business }: { business: Business[] }) {

  return (
    <MapContainer
      center={[-34.6037, -58.3816]}
      zoom={13}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {business.map(b => {

        if (!b.lat || !b.lng) return null

        return (
          <Marker
            key={b.id}
            position={[b.lat, b.lng]}
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