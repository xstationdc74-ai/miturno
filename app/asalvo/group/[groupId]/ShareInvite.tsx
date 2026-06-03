"use client";

type Props = {
  inviteToken: string;
};

export default function ShareInvite({
  inviteToken,
}: Props) {
  async function handleShare() {
    const url =
      `${window.location.origin}/asalvo/join/${inviteToken}`;

    if (navigator.share) {
      await navigator.share({
        title: "A Salvo!",
        text: "Te invito a un grupo de A Salvo!",
        url,
      });

      return;
    }

    await navigator.clipboard.writeText(url);

    alert("Link copiado!");
  }

  return (
    <button
      onClick={handleShare}
      className="border rounded-lg p-4"
    >
      Compartir invitación
    </button>
  );
}