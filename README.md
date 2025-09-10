# Elektriker Jansson Demo

A simple full‑stack demo with a React + Vite client and a Node.js + Express API server.

## Stack

- Client: React 19, Vite 7, React Router, ESLint
- Server: Node.js, Express 5, CORS, Vitest + Supertest for tests

## Folder structure

- `client/` — React app (Vite)
- `server/` — Express API with tests

## Prerequisites

- Node.js 18+ and npm
- macOS/zsh compatible commands below

## Quick start

1. Install dependencies

- Client
  - `cd client`
  - `npm install`
- Server
  - `cd ../server`
  - `npm install`

2. Run the API server (default port 3000)

- From `server/`: `node app.js`
- Server will listen on: http://localhost:3000

3. Run the client dev server (Vite)

- From `client/`: `npm run dev`
- Vite will print the local URL (defaults to http://localhost:5173)

Open the app in your browser and the client will call the API at `http://localhost:3000`.

## Scripts

Client (`client/package.json`):

- `npm run dev` — start Vite dev server
- `npm run build` — production build
- `npm run preview` — preview the production build
- `npm run lint` — run ESLint

Server (`server/package.json`):

- `npm test` — run Vitest test suite
- (No start script defined) — run with `node app.js`

## API endpoints (server)

Base URL: `http://localhost:3000`

- `GET /api/hello`
  - Response: `{ msg: "Hello World!", counterHello: number }`
- `GET /api/products`
  - Response: text (example: "Vi har dem här produkterna i lager...")
- `GET /stats`
  - Response: `{ counterProductListings: number, counterHello: number }`

Example calls:

- `curl http://localhost:3000/api/hello`
- `curl http://localhost:3000/api/products`
- `curl http://localhost:3000/stats`

## Testing

- Run tests for the server: from `server/` run `npm test`
- The client has ESLint configured: from `client/` run `npm run lint`

## Development notes

- CORS is enabled on the API, so the client (default Vite dev port 5173) can call the API (port 3000).
- The server currently binds to a fixed port (3000). If it’s occupied, stop the other process or change the port in `server/app.js`.

## Security notes

- Don’t commit secrets to source control. The server currently contains a hardcoded `apiKey` variable as an example; move such values to environment variables (e.g. `.env`) and load them via `process.env`.
- Ensure `.env` is listed in `.gitignore`.

## Production ideas / next steps

- Add a `start` and `dev` script in `server/package.json` (e.g., with `nodemon`).
- Configure a Vite proxy to the API (`vite.config.js`) to avoid hardcoding API URLs and reduce CORS overhead in dev.
- Containerize with Docker or add a root‑level script to run client and server concurrently.
- Add CI to run `npm test` (server) and `npm run build` (client).

## License

Not specified.
