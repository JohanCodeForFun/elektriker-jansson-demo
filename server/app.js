// Bygg en “Hello World”-server i Node.js & Express

// Fortsätt utveckla tidigare Node.js / Express app:
// 1. Lägg till enkel console.log i API:et för att se när anrop görs.
// 2. Logga response time med Date.now() före/efter en request.
// 3. Installera ett enklare loggpaket (t.ex. morgan i Express) och se loggarna i terminalen.
// 4. Bygg en “fake-metric”: räkna antal requests för /api/hello och skriv
// ut det i loggen.
// 5. Utveckla fake-metric: Lägg till räknare för totalt tre endpoints. Hur kan du summera alla?
// 6. Diskutera:
// varför vill man ha metrics och traces i produktion?

const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());

let counterHello = 0;

const apiKey = "sk_test_51HcR..."; // 🚨 Secret in code

app.get("/api/hello", (req, res) => {
  let msg = "Hello World!";
  // counterHello = counterHello + 1;
  counterHello++;

  console.log(new Date().toUTCString(), "request to: /api/hello", counterHello);
  res.send({ msg, counterHello });
});

let counterProductListings = 0;

app.get("/api/products", (req, res) => {
  counterProductListings++;

  console.log(
    new Date().toUTCString(),
    "request to: /api/products",
    counterProductListings
  );

  res.send("Vi har dem här produkterna i lager...");
});

app.get("/stats", (req, res) => {
  res.send({
    counterProductListings: counterProductListings + 10,
    counterHello,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
