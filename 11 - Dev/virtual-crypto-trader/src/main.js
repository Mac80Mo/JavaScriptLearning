// Liste der anzuzeigenden Kryptowährungen
const coinsToDisplay = ["BTC", "ETH", "XRP", "XLM", "ADA"];

// Startguthaben
let balance = 100000;

// Map zur Speicherung der Menge an Coins, die der Nutzer besitzt
let coinAmounts = new Map();

// Variable für die abgerufenen Daten
let data;

// Lädt gespeicherte Spieldaten aus dem Local Storage
loadGameData();

// Aktualisiert die Daten beim Start
await refresh();

// Speichert den aktuellen Spielstand im Local Storage
function saveGameData() {
  localStorage.setItem("balance", JSON.stringify(balance));
  localStorage.setItem(
    "coinAmounts",
    JSON.stringify(Array.from(coinAmounts.entries()))
  );
}

// Lädt den Spielstand aus dem Local Storage
function loadGameData() {
  const loadedBalance = JSON.parse(localStorage.getItem("balance"));

  if (loadedBalance !== null) {
    balance = loadedBalance;
  }

  const coinAmountsString = localStorage.getItem("coinAmounts");
  coinAmounts = new Map(JSON.parse(coinAmountsString));
}

// Event-Handler für den Refresh-Button
async function refreshClickHandler(event) {
  await refresh();
}

// Aktualisiert die Daten und rendert die Benutzeroberfläche
async function refresh() {
  data = await fetchData();

  renderStatus(balance, data);
  renderTable(data);
}

// Rendert den Statusbereich (Balance und Portfolio-Wert)
function renderStatus(_balance, data) {
  const refreshButtonOld = document.getElementById("refreshButton");
  refreshButtonOld?.removeEventListener("click", refreshClickHandler);

  const statusDiv = document.getElementById("status");
  statusDiv.innerHTML = `<h2>Status</h2>
  <p>Balance: ${_balance}</p>
  <p>Portfolio: ${getPortfolioValue(data)}</p>
  <button id="refreshButton">Refresh</button>`;

  const refreshButton = document.getElementById("refreshButton");
  refreshButton.addEventListener("click", refreshClickHandler);
}

// Berechnet den Gesamtwert des Portfolios basierend auf den aktuellen Preisen
function getPortfolioValue(data) {
  let sum = 0;
  for (const entry of coinAmounts.entries()) {
    const symbol = entry[0];
    const amount = entry[1];

    const coinData = data.find((coin) => coin.symbol === symbol);
    sum += amount * parseFloat(coinData.quotes.USD.price);
  }
  return sum;
}

// Rendert die Tabelle mit den Kryptowährungen und den Aktionen
function renderTable(_data) {
  let output = `<table>
<tr>
  <th>Symbol</th>
  <th>Price in USD</th>
  <th>Amount</th>
  <th>Actions</th>
</tr>`;

  // Filtert die Daten und fügt sie der Tabelle hinzu
  data
    .filter((coinData) => coinsToDisplay.includes(coinData.symbol))
    .forEach((coinData) => {
      output =
        output +
        `<tr>
        <td>${coinData.symbol}</td>
        <td>${coinData.quotes.USD.price}</td>
        <td>${coinAmounts.get(coinData.symbol) ?? 0}</td>
        <td>
          <button onclick="buyCoin('${coinData.symbol}')">Buy</button>
          <button onclick="sellCoin('${coinData.symbol}')">Sell</button>
        </td>
      </tr>`;
    });

  output += "</table>";

  const appDiv = document.getElementById("coinlist");
  appDiv.innerHTML = output;
}

// Ruft die aktuellen Kryptowährungsdaten von der API ab
async function fetchData() {
  const response = await fetch(
    "https://api.coinpaprika.com/v1/tickers?quotes=USD"
  );

  let dataResponse;

  try {
    dataResponse = await response.json();
  } catch (err) {
    dataResponse = {};
    console.log("Fehler beim Abrufen der Daten:", err);
  }

  return dataResponse; // Gibt die gesamte Antwort zurück
}

// Funktion zum Kaufen von Coins
async function buyCoin(symbol) {
  await refresh();

  const amountString = prompt("Buying " + symbol);
  const amount = parseFloat(amountString);
  if (Number.isNaN(amount)) {
    return;
  }

  if (amount <= 0) {
    return;
  }

  const coinData = data.find((coin) => coin.symbol === symbol);
  const balanceNew = balance - amount * parseFloat(coinData.quotes.USD.price);

  if (balanceNew < 0) {
    alert("Not enough balance!");
    return;
  }

  balance = balanceNew;

  let oldAmount = coinAmounts.get(symbol);
  if (oldAmount === undefined) {
    oldAmount = 0;
  }
  coinAmounts.set(symbol, oldAmount + amount);

  await refresh();
  saveGameData();
}

// Funktion zum Verkaufen von Coins
async function sellCoin(symbol) {
  await refresh();

  const amountString = prompt("Selling " + symbol);
  const amount = parseFloat(amountString);
  if (Number.isNaN(amount)) {
    return;
  }

  if (amount <= 0) {
    return;
  }

  let oldAmount = coinAmounts.get(symbol);
  if (oldAmount === undefined) {
    oldAmount = 0;
  }

  if (amount > oldAmount) {
    alert("Not enough coins in wallet!");
    return;
  }

  const coinData = data.find((coin) => coin.symbol === symbol);
  balance = balance + amount * parseFloat(coinData.quotes.USD.price);

  coinAmounts.set(symbol, oldAmount - amount);

  await refresh();
  saveGameData();
}

// Macht die Funktionen global verfügbar, damit sie in HTML-Buttons verwendet werden können
globalThis.buyCoin = buyCoin;
globalThis.sellCoin = sellCoin;
