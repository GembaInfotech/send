importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging.js');

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDQ_ZGyQd_hWAiPg-oAzSW9_5t4RaEyAhQ",
    authDomain: "parking-8e069.firebaseapp.com",
    projectId: "parking-8e069",
    storageBucket: "parking-8e069.firebasestorage.app",
    messagingSenderId: "260757557169",
    appId: "1:260757557169:web:b8de231d7f8374cdbef790",
    measurementId: "G-Q9YY220BEB"
  };
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Handle background message
messaging.onBackgroundMessage(function(payload) {
  console.log('Background message received. ', payload);

  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
