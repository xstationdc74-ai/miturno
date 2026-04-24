import "./globals.css"
import "leaflet/dist/leaflet.css"

export const metadata = {
  title: "Semilla",
  description: "Aplicaciones de gestión y reservas",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        {/* PWA base (neutral) */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />

        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>

      <body className="min-h-screen bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  )
}