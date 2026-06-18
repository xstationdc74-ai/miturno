importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyAeA6hv4ffEocEbL1058Y7tpqQ6AZ4VRjg",
  authDomain: "asalvo-app.firebaseapp.com",
  projectId: "asalvo-app",
  storageBucket: "asalvo-app.firebasestorage.app",
  messagingSenderId: "429285583800",
  appId:
    "1:429285583800:web:bd1de85e65b49ee37afd4d",
});

const messaging =
  firebase.messaging();