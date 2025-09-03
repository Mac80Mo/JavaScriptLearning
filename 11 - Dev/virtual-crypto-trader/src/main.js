const coinsToDisplay = ["BTC", "ETH", "SOL", "XRP", "XLM", "ADA"];
let balance = 100000;

const data = await fetchData();

renderStatus(balance);
renderTable(data);

function renderStatus(_balance) {
  const statusDiv = document.getElementById("status");
  statusDiv.innerHTML = `<h2>Status</h2>
  <p>Balance: ${_balance}</p>`;
}

function renderTable(_data) {
  let output = `<table>
<tr>
  <th>Symbol</th>
  <th>Price in USD</th>
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
      </tr>`;
      console.log(
        "Coin:",
        coinData.symbol,
        "price $:",
        coinData.quotes.USD.price
      );
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
