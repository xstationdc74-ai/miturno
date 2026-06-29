# 2026-06-28

- Nuevo login Google.
- Callback con parámetro next.
- Integración con profiles_asalvo.
- Corregido bug del participant_token del creador del grupo.
- ConfirmButton vuelve a funcionar.
- Flujo Crear Grupo → Confirmar Llegada operativo.

Recuperado el flujo completo de Push.
Corregido el participant_token del creador.
Corregido el INSERT de participants (automation_stage, arrival_date, timezone).
Creada la capa lib/asalvo/sendPush.ts.
Arrival Monitor integrado con sendPush().
Detectado que GroupActions debe registrar automáticamente el dispositivo cuando el permiso ya fue concedido.
