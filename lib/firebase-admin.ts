import {
  getApps,
  initializeApp,
  cert,
} from "firebase-admin/app";

import { getMessaging } from "firebase-admin/messaging";

console.log(
  "FIREBASE PROJECT:",
  process.env.FIREBASE_PROJECT_ID
);

console.log(
  "FIREBASE CLIENT:",
  process.env.FIREBASE_CLIENT_EMAIL
);

console.log(
  "PRIVATE KEY EXISTS:",
  !!process.env.FIREBASE_PRIVATE_KEY
);

console.log(
  "PRIVATE KEY START:",
  process.env.FIREBASE_PRIVATE_KEY?.substring(
    0,
    40
  )
);

const app =
  getApps().length === 0
    ? initializeApp({
        credential: cert({
          projectId:
            process.env.FIREBASE_PROJECT_ID,
          clientEmail:
            process.env.FIREBASE_CLIENT_EMAIL,
          privateKey:
            process.env.FIREBASE_PRIVATE_KEY?.replace(
              /\\n/g,
              "\n"
            ),
        }),
      })
    : getApps()[0];

export const firebaseMessaging =
  getMessaging(app);