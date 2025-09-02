const res = await fetchData();

async function fetchData() {
  const response = await fetch(
    "https://api.coinpaprika.com/v1/tickers?quotes=USD"
  );

  let data;

  try {
    data = await response.json();
  } catch (err) {
    data = {};
    console.log(err);
  }

  console.log(data);

  return true;
}
