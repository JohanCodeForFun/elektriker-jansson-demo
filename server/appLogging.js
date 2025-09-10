// Bygg en “Hello World”-server i Node.js & Express
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

// Fortsätt utveckla tidigare Node.js / Express app:
// 1. Lägg till enkel console.log i API:et för att se när anrop görs.
// 2. Logga response time med Date.now() före/efter en request.
// 3. Installera ett enklare loggpaket (t.ex. morgan i Express) och se loggarna i terminalen.
// 4. Bygg en “fake-metric”: räkna antal requests för /api/hello och skriv
// ut det i loggen.
// 5. Utveckla fake-metric: Lägg till räknare för totalt tre endpoints. Hur kan du summera alla?
// 6. Diskutera:
// varför vill man ha metrics och traces i produktion?

app.use(cors());

let counterHello = 0;

app.get("/api/hello", (req, res) => {
  counterHello = counterHello + 1;

  console.log(new Date().toUTCString(), "request /api/hello", counterHello);

  res.send("Hello World!");
});
let counterListProducts = 0;

app.get("/api/products", (req, res) => {
  counterListProducts = counterListProducts + 1;

  console.log(
    new Date().toUTCString(),
    "request /api/products",
    counterListProducts
  );

  res.send("Hello World!");
});
let counterBounceRate = 0;
let newUsers = 0;

app.get("/api/register", (req, res) => {
  counterBounceRate = counterBounceRate + 1;

  console.log(
    new Date().toUTCString(),
    "request /api/register",
    counterBounceRate
  );

  res.send("Hello World!");
});

app.get("/api/requests", (req, res) => {
  const totalRequests = counterHello + counterListProducts + counterBounceRate;
  console.log("total reqests for API: ", {
    totalRequests,
    counterHello,
    counterListProducts,
    counterBounceRate,
  });

  res.send(`total reqests for API: ${totalRequests}`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
