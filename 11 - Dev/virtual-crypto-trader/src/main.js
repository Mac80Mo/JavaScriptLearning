const res = await fetchData();
alert(res);

async function fetchData() {
  const response = await fetch(
    "https://api.coinpaprika.com/v1/tickers?quotes=USD"
  );
  const data = await response.json().catch((error) => {
    console.error("Error:", error);
  });
  console.log(data);
  return true;
}
