"use client";

import Image from "next/image";

import AppLayout from "@/components/asalvo/layout/AppLayout";
import Button from "@/components/asalvo/ui/Button";

import { supabase } from "@/lib/supabase/client";

type Props = {
  next: string;
};

export default function LoginClient({
  next,
}: Props) {
  async function handleGoogleLogin() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo:
          `${window.location.origin}/asalvo/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });
  }

  return (
    <AppLayout>
      <main className="flex flex-1 flex-col">

        <div className="flex flex-1 flex-col items-center px-8 pt-14">

          <Image
            src="/asalvo/logo.png"
            alt="A Salvo"
            width={120}
            height={120}
            priority
          />

          <h1 className="mt-6 text-5xl font-bold text-slate-900">
            A Salvo!
          </h1>

          <p className="mt-4 text-center text-lg text-slate-500">
            Te acompañamos
            <br />
            para que llegues bien.
          </p>

          <div className="mt-auto w-full">

            <Image
              src="/asalvo/login/login.png"
              alt=""
              width={420}
              height={320}
              className="mx-auto"
              priority
            />

          </div>

        </div>

        <div className="rounded-t-[36px] bg-white px-6 pb-10 pt-6 shadow-[0_-10px_30px_rgba(0,0,0,0.08)]">

          <Button
            fullWidth
            variant="secondary"
            onClick={handleGoogleLogin}
            className="flex h-14 items-center justify-center gap-3 border border-slate-200 text-lg font-semibold shadow-sm"
          >
            <Image
              src="/asalvo/google.png"
              alt="Google"
              width={24}
              height={24}
            />

            Continuar con Google

          </Button>

          <p className="mx-auto mt-8 max-w-xs text-center text-sm leading-6 text-slate-500">

            Al continuar aceptás nuestros

            <br />

            <button className="font-medium text-blue-600">
              Términos y Condiciones
            </button>

            <br />

            y{" "}

            <button className="font-medium text-blue-600">
              Política de Privacidad
            </button>

          </p>

        </div>

      </main>
    </AppLayout>
  );
}