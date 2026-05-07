import "./globals.css"
import "leaflet/dist/leaflet.css"

export const metadata = {
  title: "Bookly",
  description: "Simple booking app for small businesses",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        <link rel="manifest" href="/site.webmanifest" />

        <meta name="theme-color" content="#0f172a" />

        <meta
          name="apple-mobile-web-app-capable"
          content="yes"
        />

        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />

        <link
          rel="apple-touch-icon"
          href="/apple-touch-icon.png"
        />
      </head>

      <body className="min-h-screen bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  )
}