2026-06-27

No volver a hacer pantallas desde cero.

La lógica existente permanece.

Se migra únicamente la interfaz.

---

2026-06-27

Design System obligatorio.

Todas las pantallas usan:

AppLayout
Header
Card
Button
BottomNavigation

2026-06-28

La autenticación oficial de A Salvo pasa a ser Google OAuth.

profiles_asalvo representa la identidad permanente.

participants representa únicamente la participación del usuario dentro de un grupo.

---

2026-06-28

El creador del grupo debe actualizar siempre el participant_token en localStorage luego de crear un grupo.

No reutilizar participant_token anteriores.
