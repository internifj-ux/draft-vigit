import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBGKM6qukVRlkhDMHzBBBDYMTYaDHM8gcA",
  authDomain: "digital-vigil-1b773.firebaseapp.com",
  projectId: "digital-vigil-1b773",
  storageBucket: "digital-vigil-1b773.firebasestorage.app",
  messagingSenderId: "408186758572",
  appId: "1:408186758572:web:2b343ebb380411b4590609",
  measurementId: "G-0ZRV5R1C88"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const form = document.getElementById("candleForm");
const messageInput = document.getElementById("messageInput");
const candleWall = document.getElementById("candleWall");
const candleCount = document.getElementById("candleCount");

const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modalMessage");
const modalClose = document.getElementById("modalClose");

// Load saved candles
let candles = JSON.parse(localStorage.getItem("candles")) || [];

// Render candles
function renderCandles() {
  candleWall.innerHTML = "";

  candles.forEach((candle, index) => {
    const div = document.createElement("div");
    div.className = "candle";
    div.dataset.index = index;

    div.innerHTML = `
      <img src="images/candle.gif" alt="Candle" width="40">
      <p>${candle.message}</p>
    `;

    candleWall.appendChild(div);
  });

  candleCount.textContent = candles.length;
}

// Initial render
renderCandles();

// Event delegation for modal pop-up
candleWall.addEventListener("click", (e) => {
  const candleDiv = e.target.closest(".candle");
  if (!candleDiv) return;

  const index = candleDiv.dataset.index;
  modalMessage.textContent = candles[index].message;
  modal.classList.add("show");
});

// Submit new candle
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value.trim();
  if (!message) return;

  candles.push({ message });
  async function saveCandle(message) {
  try {
    await addDoc(collection(db, "candles"), {
      message: message,
      createdAt: serverTimestamp()
    });
    console.log("Saved globally");
  } catch (error) {
    console.error("Error saving candle:", error);
  }
}
  async function loadCandles() {
  const querySnapshot = await getDocs(collection(db, "candles"));
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    displayCandle(data.message);
  });
}

window.addEventListener("DOMContentLoaded", loadCandles);
  renderCandles();
  form.reset();
});

// Close modal
modalClose.addEventListener("click", () => modal.classList.remove("show"));
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.remove("show");
});

