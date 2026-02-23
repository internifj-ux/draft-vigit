import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// --- Firebase config ---
const firebaseConfig = {
  apiKey: "AIzaSyBGKM6qukVRlkhDMHzBBBDYMTYaDHM8gcA",
  authDomain: "digital-vigil-1b773.firebaseapp.com",
  projectId: "digital-vigil-1b773",
  storageBucket: "digital-vigil-1b773.firebasestorage.app",
  messagingSenderId: "408186758572",
  appId: "1:408186758572:web:2b343ebb380411b4590609",
  measurementId: "G-0ZRV5R1C88"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM Elements
const form = document.getElementById("candleForm");
const messageInput = document.getElementById("messageInput");
const candleWall = document.getElementById("candleWall");
const candleCount = document.getElementById("candleCount");

// Display candle
function displayCandle(message) {
  const div = document.createElement("div");
  div.className = "candle";

  // Truncate preview for wall
  let preview = message.length > 60 ? message.slice(0, 57) + "…" : message;

  div.innerHTML = `
    <img src="images/candle.gif" width="40">
    <p class="candle-message" title="${message}">${preview}</p>
  `;

  // Click to see full message
  div.querySelector(".candle-message").addEventListener("click", () => {
    alert(message);
  });

  candleWall.appendChild(div);
}

// Load candles from Firestore
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

// Save candle
async function saveCandle(message) {
  try {
    await addDoc(collection(db, "candles"), {
      message,
      createdAt: serverTimestamp()
    });
  } catch (error) {
    console.error("Error saving candle:", error);
  }
}

// Form submit
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = messageInput.value.trim();
  if (!message) return;

  await saveCandle(message);
  form.reset();
  loadCandles();
});

// Initial load
window.addEventListener("DOMContentLoaded", loadCandles);
