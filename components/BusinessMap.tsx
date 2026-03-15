"use client"

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import { useEffect } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

type Business = {
  name: string
  slug: string
  lat: number
  lng: number
}

const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41]
})

function LocateUser() {

  const map = useMap()

  useEffect(() => {

    if (!navigator.geolocation) return

    navigator.geolocation.getCurrentPosition(

      (pos) => {

        const lat = pos.coords.latitude
        const lng = pos.coords.longitude

        map.setView([lat, lng], 14)

        L.marker([lat, lng])
          .addTo(map)
          .bindPopup("Estás aquí")
          .openPopup()

      },

      () => {
        console.log("Geolocation blocked")
      },

      {
        enableHighAccuracy: true
      }

    )

  }, [map])

  return null
}

export default function BusinessMap({ businesses }: { businesses: Business[] }) {

  return (

    <MapContainer
      center={[-40.7612, -71.6463] as [number, number]}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >

      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LocateUser />

      {businesses.map((b) => (

        <Marker
          key={b.slug}
          position={[b.lat, b.lng] as [number, number]}
          icon={icon}
        >

          <Popup>

            <div>

              <strong>{b.name}</strong>

              <br />

              <a href={`/book/${b.slug}`}>
                Reservar turno
              </a>

            </div>

          </Popup>

        </Marker>

      ))}

    </MapContainer>

  )

}
