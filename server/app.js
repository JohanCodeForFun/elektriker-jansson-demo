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

// ----- CORS Configuration -----
const defaultOrigins = [
  "http://localhost:5173",
  "https://localhost:5173",
  "http://127.0.0.1:5173",
  "https://127.0.0.1:5173",
];
// Allow adding more origins via env (comma separated)
// FRONTEND_ORIGIN="https://demo.example.com" (single extra origin)
if (process.env.FRONTEND_ORIGIN) {
  defaultOrigins.push(process.env.FRONTEND_ORIGIN);
}
// ZAP_PROXY_ORIGIN used for security scanning proxy origin allowance
if (process.env.ZAP_PROXY_ORIGIN) {
  defaultOrigins.push(process.env.ZAP_PROXY_ORIGIN);
}

const allowedOrigins = Array.from(new Set(defaultOrigins));

app.use(
  cors({
    origin(origin, callback) {
      // Allow non-browser or same-origin requests (like curl / tests with no origin header)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error(`CORS blocked origin: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Accept",
      "X-Requested-With",
      "Origin",
    ],
    exposedHeaders: [
      "X-RateLimit-Limit",
      "X-RateLimit-Remaining",
      "X-RateLimit-Reset",
      "Retry-After",
    ],
    maxAge: 600, // cache preflight 10 min
  })
);

// Explicit preflight handler (optional but explicit)
app.options("*splat", (req, res) => {
  res.sendStatus(204);
});

app.use(express.json());

// Basic trust proxy (adjust if deploying behind known proxy like Heroku / Nginx)
app.set("trust proxy", 1);

// ----- Manual In-Memory Rate Limiter (per IP) -----
// Configurable via env: RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX
const RATE_LIMIT_WINDOW_MS =
  parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 60_000; // 1 minute
const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX, 10) || 60; // 60 requests / window

// Store: ip -> { count, reset }
const rateBuckets = new Map();

function rateLimiter(req, res, next) {
  // Skip preflight requests
  if (req.method === "OPTIONS") return next();
  const now = Date.now();
  const ip = req.ip || req.connection.remoteAddress || "unknown";

  let bucket = rateBuckets.get(ip);
  if (!bucket || now > bucket.reset) {
    bucket = { count: 0, reset: now + RATE_LIMIT_WINDOW_MS };
    rateBuckets.set(ip, bucket);
  }
  bucket.count++;

  const remaining = Math.max(RATE_LIMIT_MAX - bucket.count, 0);
  // Standard-ish headers
  res.setHeader("X-RateLimit-Limit", RATE_LIMIT_MAX);
  res.setHeader("X-RateLimit-Remaining", remaining);
  res.setHeader("X-RateLimit-Reset", Math.ceil(bucket.reset / 1000)); // unix seconds

  if (bucket.count > RATE_LIMIT_MAX) {
    const retryAfterSec = Math.ceil((bucket.reset - now) / 1000);
    res.setHeader("Retry-After", retryAfterSec);
    return res.status(429).json({
      error: "Too Many Requests",
      limit: RATE_LIMIT_MAX,
      windowMs: RATE_LIMIT_WINDOW_MS,
      retryAfterSec,
    });
  }
  next();
}

// Apply to API routes only
app.use("/api", rateLimiter);

// function myLogger1(req, res, next) {
//   console.log("hej jag ligger i mellan funktioner och routes.");

//   // res.send("middle: 1");
// }
// function myLogger2(req, res, next) {
//   console.log("hej jag ligger i mellan funktioner och routes.");

//   res.send("middle: 2");
// }
// function myLogger3(req, res, next) {
//   console.log("hej jag ligger i mellan funktioner och routes.");

//   res.send("middle: 3");
//   next();
// }

// app.use(myLogger1);
// app.use(myLogger2);
// app.use(myLogger3);

let counterHello = 0;

const apiKey = "sk_test_51HcR...";
console.log(apiKey);

app.get("/api/hello", (req, res) => {
  // counterHello = counterHello + 1;
  counterHello++;

  // throw new Error("något gick fel...");

  console.log(new Date().toUTCString(), "request to: /api/hello", counterHello);

  res.json({
    time: new Date().toUTCString(),
    msg: "request to: /api/hello",
    counterHello,
  });
});

let counterProductListings = 0;

const products = [
  {
    id: 1,
    name: "Laptop",
    price: 5200,
  },
  {
    id: 2,
    name: "Mobile",
    price: 2900,
  },
  {
    id: 3,
    name: "Charger",
    price: 200,
  },
];

const [a, ...b] = products;

console.log({ a, b });

app.get("/api/products", (req, res, next) => {
  try {
    counterProductListings++;
    console.log(
      new Date().toUTCString(),
      "request to: /api/products",
      counterProductListings
    );
    res.json({ products });
  } catch (error) {
    next(error);
  }
});

app.post("/api/products", (req, res) => {
  const { id, name, price } = req.body;
  if (typeof id !== "number" || !Number.isInteger(id)) {
    return res.status(400).json({ error: "Invalid or missing id (number)" });
  }
  if (typeof name !== "string" || !name.trim()) {
    return res.status(400).json({ error: "Invalid or missing name" });
  }
  if (typeof price !== "number" || Number.isNaN(price)) {
    return res.status(400).json({ error: "Invalid or missing price" });
  }
  if (products.some((p) => p.id === id)) {
    return res.status(409).json({ error: "Product id already exists" });
  }
  const product = { id, name: name.trim(), price };
  products.push(product);
  res.status(201).json({ product });
});

app.delete("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Invalid product id" });
  }

  const index = products.findIndex((p) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Product not found" });
  }

  const [removed] = products.splice(index, 1);

  res.json({ id: removed.id });
});

app.put("/api/products/:id", (req, res) => {
  const { name, price } = req.body;

  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Invalid product id" });
  }

  const index = products.findIndex((p) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Product not found" });
  }

  if (typeof name !== "string" || !name.trim()) {
    return res.status(400).json({ error: "Invalid or missing name" });
  }
  if (typeof price !== "number" || Number.isNaN(price)) {
    return res.status(400).json({ error: "Invalid or missing price" });
  }

  products[index] = { ...products[index], name: name.trim(), price };
  res.json({ product: products[index] });
});

app.get("/stats", (req, res) => {
  res.send({
    counterProductListings: counterProductListings + 10,
    counterHello,
  });
});

// 404 handler (placed before error handler)
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Central error handler
app.use((err, req, res, _next) => {
  const status = err.status || 500;
  console.error(
    `[error] ${req.method} ${req.originalUrl} ${status} ->`,
    err.message
  );
  res.status(status).json({
    error: err.message || "Internal Server Error",
    status,
    timestamp: new Date().toISOString(),
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
