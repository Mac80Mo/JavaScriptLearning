const coinsToDisplay = ["BTC", "ETH", "SOL", "XRP", "XLM", "ADA"];
const data = await fetchData();
let output = "";

// Filtere die Daten und wende anschließend forEach an
data
  .filter((coinData) => coinsToDisplay.includes(coinData.symbol))
  .forEach((coinData) => {
    output =
      output +
      `<div>Coin: ${coinData.symbol}, Price: ${coinData.quotes.USD.price} $</div>`;
    console.log(
      "Coin:",
      coinData.symbol,
      "price $:",
      coinData.quotes.USD.price
    );
  });

const appDiv = document.getElementById("coinlist");
appDiv.innerHTML = output;

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
