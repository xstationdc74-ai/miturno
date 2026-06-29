# CURRENT SPRINT

## Objetivo

Llegar a una APK funcional para la primera prueba con Leo.

---

## Estado

### ✅ Funciona

## Estado

✅ Login Google nuevo

✅ Callback OAuth

✅ Home nueva

✅ Crear grupo

✅ Join

✅ Confirmación de llegada

✅ Realtime

✅ Deploy

---

## Pendiente

- Push Notifications

- Arrival Monitor automático

- Migración visual de GroupRealtime

- APK

- Test con Leo

## Pendiente inmediato

### 🔥 Próximo archivo

app/asalvo/group/[groupId]/GroupRealtime.tsx

NO modificar lógica.

Solo migrar al nuevo Design System.

Objetivo:

- reutilizar ParticipantCard
- reutilizar Card
- reutilizar Button
- reutilizar StatusBadge

Mantener:

- realtime
- edición de horario
- update-arrival
- estados
- participantToken

---

## Después

- Join
- Activity
- Perfil
- Push Notifications
- APK
- Prueba con Leo

---

## Decisión importante

No reescribir pantallas.

Migrar únicamente la interfaz.

Toda la lógica existente se conserva.

---

## Regla

Siempre entregar archivos completos.

No hacer cambios parciales.

---

## Commit actual

feat(asalvo): migrate group layout to new design system

---

## Próximo commit esperado

feat(asalvo): migrate realtime participants to design system

✅ Push Notifications recuperadas

- register-device funcionando
- sendPush() centralizado en lib/asalvo/sendPush.ts
- send-push reutiliza sendPush()
- Arrival Monitor integrado con sendPush()
- Primer recordatorio funcionando

Pendiente:

- Automatizar register-device (eliminar botón)
- Segundo recordatorio
- Notificación al grupo
- Cron/Vercel Scheduler
- UX final
- APK
