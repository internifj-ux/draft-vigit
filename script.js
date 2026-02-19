console.log("Script loaded");

const form = document.getElementById("candleForm");
const messageInput = document.getElementById("messageInput");
const candleWall = document.getElementById("candleWall");
const candleCount = document.getElementById("candleCount");

let candles = JSON.parse(localStorage.getItem("candles")) || [];

function renderCandles() {
  candleWall.innerHTML = "";

  candles.forEach(candle => {
    const div = document.createElement("div");
    div.className = "candle";

    div.innerHTML = `
      <img src="images/candle.gif" alt="Candle" width="40">
      <p>${candle.message}</p>
    `;

    candleWall.appendChild(div);
  });

  candleCount.textContent = candles.length;
}

renderCandles();

form.addEventListener("submit", function(e){
  e.preventDefault();

  const message = messageInput.value.trim();
  if(!message) return;

  candles.push({ message });
  localStorage.setItem("candles", JSON.stringify(candles));

  renderCandles();
  form.reset();
});
