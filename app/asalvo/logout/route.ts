import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST() {
  try {
    const supabase =
      await createSupabaseServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      await supabase
        .from("push_devices")
        .update({
          active: false,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", user.id);
    }

    await supabase.auth.signOut();

    return NextResponse.json({
      success: true,
    });

  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "Unexpected error",
      },
      { status: 500 }
    );
  }
}