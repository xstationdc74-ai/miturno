import { notFound } from "next/navigation";

import { supabaseASalvo } from "@/lib/supabase/asalvo";

import AppLayout from "@/components/asalvo/layout/AppLayout";
import Header from "@/components/asalvo/layout/Header";
import BottomNavigation from "@/components/asalvo/layout/BottomNavigation";

import ShareInvite from "./ShareInvite";
import GroupRealtime from "./GroupRealtime";
import ReminderButton from "./ReminderButton";
import GroupMessages from "./GroupMessages";
import GroupActions from "./GroupActions";

type Props = {
  params: Promise<{
    groupId: string;
  }>;
};

export default async function GroupPage({
  params,
}: Props) {
  const { groupId } = await params;

  const { data: group } = await supabaseASalvo
    .from("groups")
    .select("*")
    .eq("id", groupId)
    .single();

  if (!group) {
    notFound();
  }

  return (
    <AppLayout>

      <Header
        title={group.name}
        subtitle="Grupo activo"
      />

      <main className="flex-1 px-5 pb-28 space-y-5">

        <ShareInvite
          inviteToken={group.invite_token}
        />

        <GroupRealtime
          groupId={groupId}
        />

        <GroupMessages
          groupId={groupId}
        />

        <GroupActions />

        <ReminderButton
          groupId={groupId}
        />

      </main>

      <BottomNavigation />

    </AppLayout>
  );
}