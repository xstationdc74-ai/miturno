import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";

import serviceAccount from "@/secrets/asalvo-app-firebase-adminsdk-fbsvc-c48baf03d4.json";

const app =
  getApps().length === 0
    ? initializeApp({
        credential: cert(serviceAccount as any),
      })
    : getApps()[0];

export const firebaseMessaging =
  getMessaging(app);