import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ona Housekeeping",
  description: "Gestión de tareas, limpieza y stock en tiempo real.",

  openGraph: {
    title: "Ona Housekeeping",
    description: "Sistema de housekeeping para equipos de limpieza.",
    url: "https://kume-patagonia.vercel.app/ona", // ⚠️ ajustar después
    siteName: "Ona",
    images: [
      {
        url: "/ona/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "es_AR",
    type: "website",
  },

  icons: {
    icon: [
      { url: "/ona/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/ona/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/ona/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
}

export default function OnaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}