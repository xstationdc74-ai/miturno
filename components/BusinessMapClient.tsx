"use client"

import dynamic from "next/dynamic"

const BusinessMap = dynamic(
  () => import("./BusinessMap"),
  { ssr: false }
)

export default function BusinessMapClient({ businesses }: any) {
  return <BusinessMap businesses={businesses} />
}