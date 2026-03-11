"use client";

import { useAppointments } from "@/hooks/useAppointments";

type Slot = {
  time: string;
  booked: boolean;
  client?: string;
};

export default function Calendar() {

  const { appointments, createAppointment } = useAppointments();

  const safeAppointments = Array.isArray(appointments) ? appointments : [];

  const slots: Slot[] = [
    { time: "09:00", booked: false },
    { time: "09:30", booked: false },
    { time: "10:00", booked: false },
    { time: "10:30", booked: false },
    { time: "11:00", booked: false },
  ];

  const slotsWithAppointments = slots.map((slot) => {

    const appointment = safeAppointments.find((a: any) => {
      const time = new Date(a.start_time).toLocaleTimeString("es-AR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      return time === slot.time;
    });

    if (appointment) {
      return {
        ...slot,
        booked: true,
        client: appointment.client_name,
      };
    }

    return slot;
  });

  return (
    <div style={{ padding: 40 }}>
      <h1>Agenda</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {slotsWithAppointments.map((slot) => (
          <div
            key={slot.time}
            onClick={() => {
              console.log("CLICK SLOT", slot.time);

              if (!slot.booked) {
                createAppointment(slot.time);
              }
            }}
            style={{
              padding: 16,
              border: "1px solid #ccc",
              cursor: "pointer",
              width: 250,
              background: slot.booked ? "#fee2e2" : "#e0f2fe"
            }}
          >
            <strong>{slot.time}</strong>

            <div>
              {slot.booked ? slot.client : "Libre"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}