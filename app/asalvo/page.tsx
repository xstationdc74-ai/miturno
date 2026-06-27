"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import AppLayout from "@/components/asalvo/layout/AppLayout";
import Header from "@/components/asalvo/layout/Header";
import BottomNavigation from "@/components/asalvo/layout/BottomNavigation";

import Section from "@/components/asalvo/ui/Section";
import Button from "@/components/asalvo/ui/Button";

import GroupCard from "@/components/asalvo/features/GroupCard";

type Profile = {
  id: string;
  full_name: string | null;
  email: string |null;
  avatar_url: string | null;
};

type Group = {
  id: string;
  name: string;
  status: string;
  nickname: string;
};

type HomeData = {
  profile: Profile;
  groups: Group[];
};

export default function AsalvoPage() {

  const router = useRouter();

  const [home, setHome] =
    useState<HomeData | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    async function loadHome() {

      const response =
        await fetch("/api/asalvo/home");

      if (!response.ok) {
        router.push("/login");
        return;
      }

      const data =
        await response.json();

      setHome(data);

      setLoading(false);

    }

    loadHome();

  }, [router]);

  if (loading || !home) {

    return (
      <AppLayout>

        <div className="p-6">
          Cargando...
        </div>

      </AppLayout>
    );

  }

  return (

    <AppLayout>

      <Header
        title={`Hola ${
          home.profile.full_name?.split(" ")[0] ??
          "!"
        } 👋`}
        subtitle="¿A dónde vamos hoy?"
        avatarUrl={home.profile.avatar_url}
      />

      <main className="flex-1 px-6 pb-24">

        <Section
          title="Tus grupos"
          subtitle="Elegí un grupo para ver su estado."
        >

          <div className="space-y-4">

            {home.groups.map((group) => (

              <GroupCard
                key={group.id}
                {...group}
              />

            ))}

          </div>

        </Section>

        <div className="mt-8">

          <Button
            fullWidth
            onClick={() =>
              router.push("/asalvo/create")
            }
          >
            + Nuevo grupo
          </Button>

        </div>

      </main>

      <BottomNavigation />

    </AppLayout>

  );

}