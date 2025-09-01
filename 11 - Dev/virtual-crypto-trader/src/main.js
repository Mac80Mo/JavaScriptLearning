const result = fetch("https://api.coinpaprika.com/v1/tickers?quotes=USD");
result.then((response) => {
  const bodyResponse = response.json();
  bodyResponse.then((body) => {
    console.log("body:", body);
  });
});
