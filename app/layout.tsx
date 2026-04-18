import "./globals.css"
import "leaflet/dist/leaflet.css"

export const metadata = {
  title: "Kume",
  description: "Descubrí y reservá lugares para disfrutar",
}

const SHOW_KUME = false // 🔥 cambiar a true para reactivar

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>

        {/* PWA */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#16a34a" />

        {/* iPhone */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="apple-touch-icon" href="/icon-192.png" />

      </head>

      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-900">

        {/* 🔥 HEADER */}
        {SHOW_KUME && (
          <header className="bg-white border-b">
            <div className="max-w-6xl mx-auto flex items-center justify-between px-4 h-14">

              <a href="/" className="flex items-center">
                <img
                  src="/header-kume.png"
                  className="h-10 md:h-8 w-auto"
                  alt="Kume"
                />
              </a>

              <div className="flex items-center gap-2 text-sm">

                <a
                  href="/explorar"
                  className="px-2 md:px-3 py-1.5 rounded-lg hover:bg-gray-100"
                >
                  Explorar
                </a>

                <a
                  href="/sobre"
                  className="px-2 md:px-3 py-1.5 rounded-lg hover:bg-gray-100"
                >
                  Sobre
                </a>

                <a
                  href="/sumate"
                  className="bg-green-600 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg"
                >
                  Sumate a Kume
                </a>

              </div>

            </div>
          </header>
        )}

        {/* CONTENIDO */}
        <main className="flex-1">
          {children}
        </main>

        {/* 🔥 FOOTER */}
        {SHOW_KUME && (
          <footer className="text-center text-xs text-gray-400 py-6">
            Kume — Descubrí y reservá lugares para disfrutar
          </footer>
        )}

      </body>
    </html>
  )
}