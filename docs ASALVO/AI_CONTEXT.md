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

✅ Login Google

✅ Callback OAuth

✅ Home

✅ Crear Grupo

✅ Join

✅ ConfirmButton

✅ Realtime

⏳ Push Notifications

⏳ Arrival Monitor

⏳ APK

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

## Regla de depuración

Si una funcionalidad ya funcionaba anteriormente:

NO rediseñarla.

NO proponer una arquitectura nueva.

Reconstruir el flujo existente.

Encontrar exactamente qué cambio rompió el comportamiento.

Solo después de recuperar la funcionalidad evaluar mejoras de arquitectura.

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

# Autenticación

A Salvo utiliza autenticación Google mediante Supabase Auth.

Flujo:

/asalvo/login
↓

Google OAuth

↓

/asalvo/auth/callback

↓

profiles_asalvo

↓

/asalvo

El callback acepta el parámetro ?next= y redirecciona al destino original.

La identidad permanente del usuario es profiles_asalvo.

participants representa únicamente la participación del usuario dentro de un grupo.

# Bug importante resuelto (2026-06-28)

Se detectó un bug donde el creador del grupo conservaba un
participant_token viejo en localStorage.

Consecuencia:

- ConfirmButton devolvía 500.
- No cambiaba el estado.
- El Arrival Monitor no podía continuar correctamente.

Solución:

CreateGroupPage ahora guarda:

localStorage.setItem(
"asalvo_participant_token",
data.participantToken
);

Antes de navegar al grupo.

# Reglas para continuar el proyecto

## Árbol del proyecto

Antes de indicar un archivo:

- No asumir la ubicación por convención.
- Pedir el árbol si hay dudas.
- Priorizar la estructura real del proyecto sobre nombres habituales de Next.js.

## Recuperación de funcionalidades

Cuando una funcionalidad funcionó anteriormente:

- No proponer una implementación nueva.
- Reconstruir el flujo existente.
- Seguir las llamadas reales entre componentes, lib y api.
- Encontrar el punto exacto donde se cortó el flujo.

## Método

Una miga de pan por vez.

Cada paso debe responder una única pregunta.

No pedir búsquedas masivas (`grep -R .`) si ya existe información más específica.

Siempre partir del archivo que el usuario está mostrando.

# Estado de Push Notifications

Arquitectura existente (NO rediseñar):

GroupActions
↓
lib/asalvo/messaging.ts
↓
firebase-messaging-sw.js
↓
/api/asalvo/register-device
↓
push_devices
↓
/api/asalvo/send-test-push
↓
Firebase Admin
↓
Android

Objetivo:
Encontrar el punto donde este flujo dejó de ejecutarse.
No reemplazarlo por otro.
