export function generateSlots(start: string, end: string, interval: number) {
  const slots: string[] = [];

  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);

  const startDate = new Date();
  startDate.setHours(startHour, startMinute, 0, 0);

  const endDate = new Date();
  endDate.setHours(endHour, endMinute, 0, 0);

  const current = new Date(startDate);

  while (current <= endDate) {
    const h = current.getHours().toString().padStart(2, "0");
    const m = current.getMinutes().toString().padStart(2, "0");

    slots.push(`${h}:${m}`);

    current.setMinutes(current.getMinutes() + interval);
  }

  return slots;
}