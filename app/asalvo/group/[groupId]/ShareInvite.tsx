"use client";

import Button from "@/components/asalvo/ui/Button";

type Props = {
  inviteToken: string;
};

export default function ShareInvite({
  inviteToken,
}: Props) {
  async function handleShare() {
    const url =
      `${window.location.origin}/asalvo/join/${inviteToken}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "A Salvo!",
          text: "Te invito a acompañarme con A Salvo.",
          url,
        });

        return;
      }

      await navigator.clipboard.writeText(url);

      alert("Link copiado al portapapeles.");

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Button
      fullWidth
      onClick={handleShare}
    >
      Compartir invitación
    </Button>
  );
}