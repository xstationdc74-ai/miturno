# CURRENT SPRINT

## Objetivo

Llegar a una APK funcional para la primera prueba con Leo.

---

## Estado

### ✅ Funciona

- Login
- Home nueva
- HeroArrival
- Header
- BottomNavigation
- FloatingButton
- Crear Grupo
- API /groups
- Crear grupo desde UI
- Share Invite
- Grupo integrado al nuevo AppLayout
- Navegación Home ↔ Grupo
- Deploy en Vercel OK

---

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
