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
  localStorage.setItem("candles", JSON.stringify(candles));

  renderCandles();
  form.reset();
});

// Close modal
modalClose.addEventListener("click", () => modal.classList.remove("show"));
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.remove("show");
});
