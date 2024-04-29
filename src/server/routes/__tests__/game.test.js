import request from "supertest";
import express from "express";
import router from "../game.js";
import { afterEach, describe, test, vi } from "vitest";

const app = express();
app.use(express.json());
app.use("/", router);

afterEach(() => {
  vi.clearAllMocks();
});

describe("GET /health", () => {
  test('responds with json containing "OK"', async () => {
    const response = await request(app).get("/health");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("OK");
  });
});

describe("POST /game", () => {
  test("responds with the posted JSON object", async () => {
    const data = { game: "dota 2", userID: "id11234", device: "computer" };
    const response = await request(app)
      .post("/game")
      .send(data)
      .set("Accept", "application/json");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(data);
  });
});
