import Calendar from "@/components/Calendar";

export default function Page() {
  return (
    <div
      style={{
        padding: 40,
        background: "red",
        minHeight: "100vh"
      }}
    >
      <Calendar />
    </div>
  );
}