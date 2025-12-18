import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBh4IMoO-eATXegFHFsLmi-XzD5pOAIdBc",
    authDomain: "ecocalculator-51510.firebaseapp.com",
    projectId: "ecocalculator-51510",
    storageBucket: "ecocalculator-51510.firebasestorage.app",
    messagingSenderId: "828959857402",
    appId: "1:828959857402:web:03c673eb2c4491c13dc743",
    measurementId: "G-TGWD74FYM8"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
