const res = await fetchData();
alert(res);

async function fetchData() {
  const response = await fetch(
    "https://api.coinpaprika.com/v1/tickers?quotes=USD"
  );
  const data = await response.json();
  console.log(data);
  return true;
}
