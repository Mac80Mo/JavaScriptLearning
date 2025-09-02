const data = await fetchData();
console.log("Komplette API-Antwort:", data); // Gibt das gesamte Array aus

for (const coinData of data) {
  console.log("Coin:", coinData.symbol, "price $:", coinData.quotes.USD.price);
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
