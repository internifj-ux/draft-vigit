// -----------------------------
// Candle Vigil Firebase Script
// -----------------------------

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// --- FIREBASE CONFIG ---
const firebaseConfig = {
  apiKey: "AIzaSyBGKM6qukVRlkhDMHzBBBDYMTYaDHM8gcA",
  authDomain: "digital-vigil-1b773.firebaseapp.com",
  projectId: "digital-vigil-1b773",
  storageBucket: "digital-vigil-1b773.firebasestorage.app",
  messagingSenderId: "408186758572",
  appId: "1:408186758572:web:2b343ebb380411b4590609",
  measurementId: "G-0ZRV5R1C88"
};

// --- INITIALIZE FIREBASE ---
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// -----------------------------
// DOM ELEMENTS
// -----------------------------
const form = document.getElementById("candleForm");
const messageInput = document.getElementById("messageInput");
const candleWall = document.getElementById("candleWall");
const candleCount = document.getElementById("candleCount");

// -----------------------------
// DISPLAY CANDLE
// -----------------------------
function displayCandle(message) {
  const div = document.createElement("div");
  div.className = "candle";

  div.innerHTML = `
    <img src="images/candle.gif" width="40">
    <p class="candle-message" title="${message}">${message}</p>
  `;

  // On click, show full message
  div.querySelector(".candle-message").addEventListener("click", () => {
    alert(message);
  });

  candleWall.appendChild(div);
}

// -----------------------------
// LOAD CANDLES FROM FIRESTORE
// -----------------------------
async function loadCandles() {
  candleWall.innerHTML = "";
  let count = 0;
  try {
    const querySnapshot = await getDocs(collection(db, "candles"));
    querySnapshot.forEach((doc) => {
      count++;
      displayCandle(doc.data().message);
    });
    candleCount.textContent = count;
  } catch (error) {
    console.error("Error loading candles:", error);
  }
}

// -----------------------------
// SAVE CANDLE TO FIRESTORE
// -----------------------------
async function saveCandle(message) {
  try {
    await addDoc(collection(db, "candles"), {
      message: message,
      createdAt: serverTimestamp()
    });
    console.log("Saved globally!");
  } catch (error) {
    console.error("Error saving candle:", error);
  }
}

// -----------------------------
// FORM SUBMIT
// -----------------------------
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = messageInput.value.trim();
  if (!message) return;

  await saveCandle(message);
  form.reset();
  loadCandles();
});

// -----------------------------
// INITIAL LOAD
// -----------------------------
window.addEventListener("DOMContentLoaded", loadCandles);
