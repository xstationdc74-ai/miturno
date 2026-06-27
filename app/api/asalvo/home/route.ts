import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase =
      await createSupabaseServerClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        {
          error: "Usuario no autenticado",
        },
        { status: 401 }
      );
    }

    // Perfil del usuario

    const {
      data: profile,
      error: profileError,
    } = await supabase
      .from("profiles_asalvo")
      .select(`
        id,
        full_name,
        email,
        avatar_url
      `)
      .eq("id", user.id)
      .single();

    if (profileError) {
      return NextResponse.json(
        {
          error: profileError.message,
        },
        { status: 500 }
      );
    }

    // Grupos

    const {
      data: participants,
      error: groupsError,
    } = await supabase
      .from("participants")
      .select(`
        nickname,
        groups (
          id,
          name,
          status,
          owner_id,
          created_at
        )
      `)
      .eq("user_id", user.id);

    if (groupsError) {
      return NextResponse.json(
        {
          error: groupsError.message,
        },
        { status: 500 }
      );
    }

    const groups =
      participants.map((item: any) => ({
        nickname: item.nickname,
        ...(Array.isArray(item.groups)
          ? item.groups[0]
          : item.groups),
      }));

    return NextResponse.json({
      profile,
      groups,
    });

  } catch {
    return NextResponse.json(
      {
        error: "Unexpected error",
      },
      { status: 500 }
    );
  }
}