import "./globals.css"
import Image from "next/image"
import Link from "next/link"
import SplashScreen from "@/components/SplashScreen"

export const metadata = {
  title: "Kume",
  description: "Descubrí y reservá lugares para disfrutar"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col bg-gray-50 text-gray-900">

        <SplashScreen>

          {/* HEADER */}

          <header className="bg-white border-b">
            <div className="max-w-6xl mx-auto flex items-center justify-between p-4">

              <Link href="/" className="flex items-center gap-2">

             <img
  src="/logo2-kume.png"
  alt="Kume"
    className="h-12 md:h-14 w-auto scale-150 origin-left"
/>
            </Link>

              <nav className="flex gap-6 text-sm">

                <Link href="/explorar">
                  Explorar
                </Link>

                <Link href="/sobre-kume">
                  Sobre Kume
                </Link>

                <Link
                  href="/sumar-lugar"
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Sumar lugar
                </Link>

              </nav>

            </div>
          </header>

          {/* CONTENIDO */}

          <main className="flex-1">
            {children}
          </main>

          {/* FOOTER */}

          <footer className="bg-white border-t mt-10">
            <div className="max-w-6xl mx-auto p-6 text-sm text-gray-600 space-y-3">

              <div className="font-semibold text-gray-800">
                Kume — Descubrí y reservá lugares para disfrutar
              </div>

              <div>
                “Kume” significa bienestar en mapudungun.
              </div>

              <div className="flex gap-6">

                <Link href="/explorar">Explorar</Link>
                <Link href="/sumar-lugar">Sumar lugar</Link>
                <Link href="/sobre-kume">Sobre Kume</Link>

              </div>

              <div className="text-xs text-gray-400">
                Powered by 01bit
              </div>

            </div>
          </footer>

        </SplashScreen>

      </body>
    </html>
  )
}