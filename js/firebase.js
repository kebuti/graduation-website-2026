import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";

import { getFirestore }
from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";
// Import the functions you need from the SDKs you need
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnfqftjJKWxzC4cLtt573e4H_AFNwdTrA",
  authDomain: "kebuti-graduation-2026.firebaseapp.com",
  projectId: "kebuti-graduation-2026",
  storageBucket: "kebuti-graduation-2026.firebasestorage.app",
  messagingSenderId: "252562124773",
  appId: "1:252562124773:web:4eda212a5e6dc69552c90c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("Firebase connected!");
console.log(db);

export { db };