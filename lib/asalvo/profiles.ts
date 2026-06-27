import { supabase } from "@/lib/supabase/client";

export type Profile = {
  id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
};

export async function getProfile(): Promise<Profile | null> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return null;
  }

  const { data, error } = await supabase
    .from("profiles_asalvo")
    .select("id, full_name, email, avatar_url")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("Error loading profile:", error);
    return null;
  }

  return data;
}