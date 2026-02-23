// -----------------------------
// Candle Vigil Firebase Script
// -----------------------------
const form = document.getElementById("candleForm");
const messageInput = document.getElementById("messageInput");
const candleWall = document.getElementById("candleWall");
const candleCount = document.getElementById("candleCount");

// Display a candle visually
function displayCandle(message) {
  const div = document.createElement("div");
  div.className = "candle";

  div.innerHTML = `
    <img src="images/candle.gif" width="40">
    <p class="candle-message" title="${message}">${message}</p>
  `;

  // On click, show full message in popup
  div.querySelector(".candle-message").addEventListener("click", () => {
    alert(message);
  });

  candleWall.appendChild(div);
}

// Load all candles from Firebase
async function loadCandles() {
  candleWall.innerHTML = "";
  let count = 0;
  const querySnapshot = await getDocs(collection(window.db, "candles"));
  querySnapshot.forEach((doc) => {
    count++;
    displayCandle(doc.data().message);
  });
  candleCount.textContent = count;
}

// Save candle to Firebase
async function saveCandle(message) {
  try {
    await addDoc(collection(window.db, "candles"), {
      message: message,
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
