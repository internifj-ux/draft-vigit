const form = document.getElementById("candleForm");
const messageInput = document.getElementById("messageInput");
const candleWall = document.getElementById("candleWall");
const candleCount = document.getElementById("candleCount");

const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modalMessage");
const modalClose = document.getElementById("modalClose");

let candles = JSON.parse(localStorage.getItem("candles")) || [];

// Render candles
function renderCandles() {
  candleWall.innerHTML = "";

  candles.forEach((candle, index) => {
    const div = document.createElement("div");
    div.className = "candle";

    div.innerHTML = `
      <img src="images/candle.gif" alt="Candle" width="40">
      <p>${candle.message}</p>
    `;

    // Show modal on click
    div.addEventListener("click", () => {
      modal.style.display = "flex";
      modalMessage.textContent = candle.message;
    });

    candleWall.appendChild(div);
  });

  candleCount.textContent = candles.length;
}

// Initial render
renderCandles();

// Handle form submit
form.addEventListener("submit", function(e){
  e.preventDefault();
  const message = messageInput.value.trim();
  if(!message) return;

  candles.push({ message });
  localStorage.setItem("candles", JSON.stringify(candles));

  renderCandles();
  form.reset();
});

// Close modal
modalClose.addEventListener("click", () => modal.style.display = "none");
modal.addEventListener("click", (e) => {
  if(e.target === modal) modal.style.display = "none";
});
