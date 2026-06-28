# Arquitectura Semilla Studio

## Estructura

app/
→ Presentación

components/
→ Componentes reutilizables

lib/
→ Inteligencia del producto

styles/
→ Identidad visual

---

## Regla

Las pantallas nunca hablan con Supabase.
Toda la lógica vive en lib/ o api/.

---

## UX

La Home usa:

- Header
- HeroArrival
- Section
- GroupCard
- BottomNavigation

---

## Estrategia de migración

No reescribir pantallas.

Envolver la lógica existente con:

- AppLayout
- Header
- Card
- Button
- BottomNavigation

Migrar componente por componente.
