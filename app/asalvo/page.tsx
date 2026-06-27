"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import AppLayout from "@/components/asalvo/layout/AppLayout";
import Header from "@/components/asalvo/layout/Header";
import BottomNavigation from "@/components/asalvo/layout/BottomNavigation";

import Section from "@/components/asalvo/ui/Section";
import FloatingButton from "@/components/asalvo/ui/FloatingButton";

import GroupCard from "@/components/asalvo/features/GroupCard";
import HeroArrival from "@/components/asalvo/features/HeroArrival";
import EmptyState from "@/components/asalvo/features/EmptyState";

type Profile = {
  id: string;
  full_name: string | null;
  email: string | null;
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
        title={`¡Hola, ${
          home.profile.full_name?.split(" ")[0] ?? ""
        }! 👋`}
        subtitle={
          home.groups.length > 0
            ? "Tenés una llegada en curso."
            : "Todo tranquilo."
        }
        avatarUrl={home.profile.avatar_url}
      />

      <main className="flex-1 px-5 pb-28">

        <HeroArrival
          status={
            home.groups.length > 0
              ? "active"
              : "idle"
          }
          title={
            home.groups.length > 0
              ? home.groups[0].name
              : "Todo tranquilo"
          }
          subtitle={
            home.groups.length > 0
              ? home.groups[0].nickname
              : "No hay llegadas pendientes."
          }
        />

        <Section
          title="Mis grupos"
        >

          {home.groups.length === 0 ? (

            <EmptyState
              title="Todavía no tenés grupos"
              description="Creá un grupo o unite mediante una invitación."
              actionLabel="Crear grupo"
              onAction={() =>
                router.push("/asalvo/create")
              }
            />

          ) : (

            <div className="space-y-3">

              {home.groups.map((group) => (

                <GroupCard
                  key={group.id}
                  {...group}
                />

              ))}

            </div>

          )}

        </Section>

      </main>

      <FloatingButton
        onClick={() =>
          router.push("/asalvo/create")
        }
      />

      <BottomNavigation />

    </AppLayout>
  );
}