import { supabaseASalvo } from "@/lib/supabase/asalvo";
import { notFound } from "next/navigation";
import JoinForm from "./JoinForm";

type Props = {
  params: Promise<{
    inviteToken: string;
  }>;
};

export default async function JoinPage({ params }: Props) {
  const { inviteToken } = await params;

 const supabase = supabaseASalvo;
  const { data: group } = await supabase
    .from("groups")
    .select("*")
    .eq("invite_token", inviteToken)
    .single();

  if (!group) {
    notFound();
  }

  return (
    <main className="min-h-screen max-w-md mx-auto p-6 flex flex-col gap-6">
      <h1 className="text-4xl font-bold text-center">
        A Salvo!
      </h1>

      <p className="text-center">
        Te invitaron a:
      </p>

      <h2 className="text-2xl font-semibold text-center">
        {group.name}
      </h2>

      <div>
<JoinForm inviteToken={inviteToken} />
</div>
    </main>
  );
}