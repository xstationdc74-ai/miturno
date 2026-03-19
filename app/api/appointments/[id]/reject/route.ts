import { supabase } from "@/lib/supabase/client"
import { NextResponse } from "next/server"

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  const { id } = await params

  const { error } = await supabase
    .from("appointments")
    .update({ status: "rejected" })
    .eq("id", id)

  if (error) {
    console.error("ERROR REJECT", error)
  }

  return NextResponse.redirect(new URL("/admin", req.url))
}