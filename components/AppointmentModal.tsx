type Props = {
  modalOpen: boolean;
  selectedSlot: string;
  clientName: string;
  setClientName: (name: string) => void;
  saveAppointment: () => void;
  closeModal: () => void;
};

export default function AppointmentModal({
  modalOpen,
  selectedSlot,
  clientName,
  setClientName,
  saveAppointment,
  closeModal
}: Props) {

  if (!modalOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div
        style={{
          background: "white",
          padding: 30,
          borderRadius: 10,
          width: 320,
          color: "#111"
        }}
      >
        <h3>Nuevo turno</h3>

        <p><strong>{selectedSlot}</strong></p>

        <input
          autoFocus
          placeholder="Nombre del cliente"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              saveAppointment();
            }
          }}
          style={{
            width: "100%",
            padding: 8,
            marginTop: 10,
            marginBottom: 20,
            border: "1px solid #ccc"
          }}
        />

        <button
          onClick={saveAppointment}
          style={{
            background: "#3b82f6",
            color: "white",
            border: "none",
            padding: "8px 12px",
            borderRadius: 6,
            cursor: "pointer"
          }}
        >
          Guardar
        </button>

        <button
          onClick={closeModal}
          style={{
            marginLeft: 10,
            padding: "8px 12px"
          }}
        >
          Cancelar
        </button>

      </div>
    </div>
  );
}