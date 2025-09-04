const coinsToDisplay = ["BTC", "ETH", "XRP", "XLM", "ADA"];
let balance = 100000;
let coinAmounts = new Map();
let data;

loadGameData();

await refresh();

function saveGameData() {
  localStorage.setItem("balance", JSON.stringify(balance));
  localStorage.setItem(
    "coinAmounts",
    JSON.stringify(Array.from(coinAmounts.entries()))
  );
}

function loadGameData() {
  const loadedBalance = JSON.parse(localStorage.getItem("balance"));

  if (loadedBalance !== null) {
    balance = loadedBalance;
  }

  const coinAmountsString = localStorage.getItem("coinAmounts");
  coinAmounts = new Map(JSON.parse(coinAmountsString));
}

async function refreshClickHandler(event) {
  await refresh();
}

async function refresh() {
  data = await fetchData();

  renderStatus(balance, data);
  renderTable(data);
}

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

function renderTable(_data) {
  let output = `<table>
<tr>
  <th>Symbol</th>
  <th>Price in USD</th>
  <th>Amount</th>
  <th>Actions</th>
</tr>`;

  // Filtere die Daten und wende anschließend forEach an
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

  return dataResponse; // Direkt die gesamte Antwort zurückgeben
}

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

globalThis.buyCoin = buyCoin;
globalThis.sellCoin = sellCoin;
