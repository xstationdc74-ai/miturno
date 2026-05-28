import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cali Patagonia",
  description: "Piezas únicas nacidas del bosque",

  openGraph: {
    title: "Cali Patagonia",
    description: "Piezas únicas nacidas del bosque",
    images: [
      {
        url: "/cali/cali-og.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },

  icons: {
    icon: "/cali/favicon.ico",
    apple: "/cali/apple-touch-icon.png",
  },
}

export default function CaliLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}