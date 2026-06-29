# NEXT TASK

Objetivo inmediato

Recuperar completamente el flujo automático.

Pendientes:

1.  Push Notifications

2.  Arrival Monitor

3.  Verificar recordatorios automáticos

4.  Migrar visualmente GroupRealtime al Design System

5.  APK

6.  Prueba con notebook y telefono

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
