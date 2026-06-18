import {
  getMessaging,
  isSupported,
} from "firebase/messaging";

import { firebaseApp } from "./firebase";

export async function getMessagingInstance() {
  const supported =
    await isSupported();

  console.log(
    "FIREBASE SUPPORTED:",
    supported
  );

  if (!supported) {
    return null;
  }

  return getMessaging(firebaseApp);
}