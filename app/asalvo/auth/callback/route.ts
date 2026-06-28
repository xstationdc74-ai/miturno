import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);

  const code =
    requestUrl.searchParams.get("code");

  const next =
    requestUrl.searchParams.get("next") ??
    "/asalvo";

  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(
            ({ name, value, options }) =>
              cookieStore.set(
                name,
                value,
                options
              )
          );
        },
      },
    }
  );

  if (code) {
    await supabase.auth.exchangeCodeForSession(
      code
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data: profile } =
      await supabase
        .from("profiles_asalvo")
        .select("id")
        .eq("id", user.id)
        .maybeSingle();

    if (!profile) {
      await supabase
        .from("profiles_asalvo")
        .insert({
          id: user.id,
          email: user.email,
          full_name:
            user.user_metadata.full_name ??
            user.user_metadata.name,
          avatar_url:
            user.user_metadata.avatar_url,
        });
    }
  }
return NextResponse.redirect(
  new URL("/asalvo", request.url)
);
}