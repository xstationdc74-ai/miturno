import Card from "@/components/asalvo/ui/Card"
import Button from "@/components/asalvo/ui/Button"
import StatusBadge from "@/components/asalvo/ui/StatusBadge"


<Card className="space-y-3">
  <StatusBadge variant="success">
    Llegó a destino
  </StatusBadge>

  <StatusBadge variant="info">
    En camino
  </StatusBadge>

  <StatusBadge variant="warning">
    Pendiente
  </StatusBadge>

  <StatusBadge variant="danger">
    Demorado
  </StatusBadge>

  <StatusBadge variant="invite">
    Invitación
  </StatusBadge>
</Card>

export default function LabPage() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-md space-y-6">
        <Card className="space-y-3">
          <Button fullWidth>
            Crear grupo
          </Button>

          <Button
            variant="secondary"
            fullWidth
          >
            Unirme a un grupo
          </Button>

          <Button
            variant="ghost"
            fullWidth
          >
            Cancelar
          </Button>
        </Card>
      </div>
    </main>
  )
}