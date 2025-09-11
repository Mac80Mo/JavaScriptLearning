import { setupCounter } from "./counter.js";

setTimeout(async () => {
  const lodash = await import("lodash");
  const name = { vorname: "Max", name: "Musermann" };
  const obj = { name };

  const clone = lodash.cloneDeep(obj);

  console.log(clone.name === name);
}, 1000);

document.querySelector("#app").innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img class="logo vanilla" alt="JavaScript logo" />
    </a>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`;

setupCounter(document.querySelector("#counter"));
