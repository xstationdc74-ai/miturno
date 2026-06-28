# AI_CONTEXT.md

# Proyecto

Nombre: A Salvo!

Estado: Beta

Objetivo inmediato:
Llegar a una APK funcional para probar con usuarios reales (Leo).

---

# Filosofía

A Salvo NO es una aplicación de geolocalización.

Es una aplicación para acompañar llegadas.

No controla.
No vigila.
No rastrea.

Acompaña.

---

# Stack

Next.js 16
React 19
TypeScript
Tailwind v4
Supabase
Realtime
Vercel

---

# Arquitectura

app/
→ Presentación

components/
→ Componentes reutilizables

lib/
→ Inteligencia del producto

styles/
→ Identidad visual

api/
→ Comunicación con Supabase

Regla:

Las pantallas nunca hablan directamente con Supabase si esa lógica puede vivir en lib/ o api/.

---

# Design System

Todos los componentes usan:

AppLayout
Header
BottomNavigation
Card
Button
Avatar
Section

No crear estilos nuevos si ya existe un componente reutilizable.

---

# Estrategia de migración

NO reescribir la aplicación.

Mantener la lógica existente.

Migrar únicamente la interfaz.

Envolver los componentes viejos con el nuevo Design System.

---

# Estado actual

✅ Login

✅ Home nueva

✅ Hero nuevo

✅ GroupCard nuevo

✅ Header nuevo

✅ BottomNavigation nueva

✅ FloatingButton

✅ Crear Grupo

✅ API de grupos

✅ Compartir invitación

✅ Grupo integrado al nuevo layout

⏳ GroupRealtime (pendiente de migrar)

⏳ Join

⏳ Activity

⏳ Perfil

⏳ Push Notifications

⏳ APK

---

# Flujo principal

Home

↓

Crear grupo

↓

Grupo

↓

Compartir

↓

Join

↓

Confirmar llegada

↓

Realtime

↓

Arrival Monitor

↓

Push

---

# Reglas de trabajo

Una modificación por vez.

Si un archivo cambia mucho:
entregar el archivo completo.

No hacer cambios parciales ("bisturí").

No asumir.

Preguntar si falta contexto.

---

# UX

Mobile First.

La versión importante es Android.

Las decisiones de UX se validan en teléfono, no en navegador.

No optimizar detalles visuales antes de cerrar el flujo funcional.

---

# Estructura de migración

Home
✅

Grupo
⏳

Join
⏳

Perfil
⏳

Activity
⏳

---

# Estado del Backend

Backend funcional.

No modificar la lógica salvo que exista un bug.

El objetivo actual es migrar la interfaz.

---

# Próximo objetivo

Migrar completamente GroupRealtime.tsx al nuevo Design System reutilizando:

Card
ParticipantCard
Button
StatusBadge

sin modificar la lógica existente.

---

# Visión Semilla Studio

Toda aplicación debe respetar:

Presentación
↓

Componentes

↓

Lógica

↓

Datos

Nunca mezclar responsabilidades.

# Cómo trabajar con Diego

Responder corto.

Menos explicación.

Más código.

Cuando un archivo requiere muchos cambios:

→ devolver el archivo completo.

No usar "bisturí".

Priorizar cerrar funcionalidades antes que perfeccionar la UX.

Objetivo actual:

APK funcional.
