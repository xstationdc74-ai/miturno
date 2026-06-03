"use client";

type Props = {
  groupId: string;
};

export default function ReminderButton({
  groupId,
}: Props) {
  async function handleClick() {
    await fetch("/api/asalvo/remind", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        groupId,
      }),
    });
  }

  return (
    <button
      onClick={handleClick}
      className="border rounded-lg p-4"
    >
      Forzar recordatorio 👋
    </button>
  );
}