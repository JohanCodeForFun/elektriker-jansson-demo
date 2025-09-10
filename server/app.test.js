import request from "supertest";
import app from "./app";
import { describe, it, expect } from "vitest";

describe("GET /api/hello", () => {
  it("responds with 200", async () => {
    const res = await request(app).get("/api/hello");

    expect(res.status).toBe(200);
  });

  it("responds with Hello World!", async () => {
    const expectedMsg = "Hello World!";

    const res = await request(app).get("/api/hello");

    const data = JSON.parse(res.text);

    console.log("response:", res.text);
    console.log("data:", data);

    expect(data).toBeTruthy();
    expect(data).toHaveProperty("msg");
    expect(data).toHaveProperty("counterHello");
    expect(data.msg).toBe(expectedMsg);
  });

  it("responds correct numer of counter for requests", async () => {
    const baseRes = await request(app).get("/api/hello");
    const counter = baseRes.body.counterHello;

    console.log("POW", counter);

    // gör tre anrop
    for (let i = 1; i <= 3; i++) {
      const res = await request(app).get("/api/hello");
      const data = JSON.parse(res.text);

      expect(data).toBeTruthy();
      expect(data).toHaveProperty("counterHello");
      expect(data.counterHello).toBe(counter + i);
    }
  });
});
