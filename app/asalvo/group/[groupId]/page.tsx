import { notFound } from "next/navigation";
import { supabaseASalvo } from "@/lib/supabase/asalvo";
import GroupActions from "./GroupActions";
import GroupRealtime from "./GroupRealtime";
import ShareInvite from "./ShareInvite";
import ReminderButton from "./ReminderButton";

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
    <main className="min-h-screen max-w-md mx-auto p-6 flex flex-col gap-6">
      <h1 className="text-4xl font-bold text-center">
        A Salvo!
      </h1>

      <h2 className="text-2xl font-semibold text-center">
        {group.name}
      </h2>

     
      <ShareInvite inviteToken={group.invite_token} />

      <GroupRealtime groupId={groupId} />

      <GroupActions />

      <ReminderButton
  groupId={groupId}
/>
      
    </main>
  );
}