import { auth } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

/* LOGIN */
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(
        auth,
        loginForm.email.value,
        loginForm.password.value
      );
      window.location.href = "index.html";
    } catch (err) {
      document.getElementById("login-status").textContent = err.message;
    }
  });
}

/* REGISTER */
const registerForm = document.getElementById("register-form");
if (registerForm) {
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(
        auth,
        registerForm.email.value,
        registerForm.password.value
      );
      window.location.href = "index.html";
    } catch (err) {
      document.getElementById("register-status").textContent = err.message;
    }
  });
}

/* HEADER AUTH */
onAuthStateChanged(auth, (user) => {
  const authArea = document.getElementById("auth-area");
  if (!authArea) return;

  if (user) {
    authArea.innerHTML = `
      <span>${user.email}</span>
      <button class="recalculate-btn" id="logout-btn">Logout</button>
    `;
    document.getElementById("logout-btn").onclick = () => signOut(auth);
  } else {
    authArea.innerHTML = `<a href="login.html">Login</a>`;
  }
});
