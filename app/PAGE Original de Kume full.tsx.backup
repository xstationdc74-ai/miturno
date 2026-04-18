"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import dynamic from "next/dynamic";
import Link from "next/link";

const BusinessMapClient = dynamic(
  () => import("@/components/BusinessMap"),
  { ssr: false }
);

export default function Page() {

  const [businesses, setBusinesses] = useState<any[]>([]);

  useEffect(() => {
    loadBusinesses();
  }, []);

  const loadBusinesses = async () => {
    const { data } = await supabase
      .from("business")
      .select("*");

    setBusinesses(data || []);
  };

  return (

    <div className="flex flex-col">

      <section className="text-center py-8 px-6">

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Descubrí lugares para disfrutar
        </h1>

        <p className="text-gray-600 mt-2">
          Experiencias, comida y bienestar cerca tuyo
        </p>

        <div className="flex justify-center gap-3 mt-4">

          <Link
            href="/explorar"
            className="bg-green-600 text-white px-5 py-2 rounded-lg text-sm font-medium"
          >
            Explorar
          </Link>

        </div>

      </section>

      <section className="h-[75vh]">

        <BusinessMapClient businesses={businesses} />

      </section>

    </div>

  );
}