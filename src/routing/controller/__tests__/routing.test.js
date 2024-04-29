import { describe, test, expect, vi, afterEach } from "vitest";
import { getNextServer, handleRequest, requestToInstance } from "../routing.js";

global.fetch = vi.fn();
vi.mock("../routing.js");

afterEach(() => {
  vi.clearAllMocks();
});

test("sendRequest and handle request function", () => {
  describe("requestToInstance function", () => {
    test("should send request to server", async () => {
      vi.mocked(sendRequest).mockResolvedValueOnce({
        status: 200,
        json: () =>
          Promise.resolve({
            game: "dota 2",
            userID: "id11234",
            device: "computer",
          }),
      });
      const req = {
        body: { game: "dota 2", userID: "id11234", device: "computer" },
      };

      // Mock response object
      const res = { game: "dota 2", userID: "id11234", device: "computer" };

      const response = await requestToInstance(
        "http://localhost:3009",
        req,
        res
      );

      expect(response.status).toEqual(200);
      expect(sendRequest).toHaveBeenCalledTimes(1);
      expect(await response.json()).toEqual({
        game: "dota 2",
        userID: "id11234",
        device: "computer",
      });
    });

    test("throws an error when server times out after 5 seconds", async () => {
      vi.mocked(sendRequest).mockRejectedValueOnce(new Error("TypeError"));

      const url = "http://localhost:3000";
      const req = {
        body: { game: "dota 2", userID: "id11234", device: "computer" },
      };
      const res = { json: vi.fn() };
      const signal = new AbortController().signal;

      await expect(
        requestToInstance(url, req, res, signal)
      ).rejects.toThrowError();
    }, 10000);
  });

  describe("handleRequest function", () => {
    test("should handle request when server is available", async () => {
      vi.mocked(handleRequest).mockReturnValueOnce({
        status: 200,
        json: () =>
          Promise.resolve({
            game: "dota 2",
            userID: "id11234",
            device: "computer",
          }),
      });

      const req = {
        body: { game: "dota 2", userID: "id11234", device: "computer" },
      };

      // Mock response object
      const res = {
        game: "dota 2",
        userID: "id11234",
        device: "computer",
      };

      const response = await handleRequest(req, res, 1);

      expect(response.status).to.equal(200);
      expect(handleRequest).toHaveBeenCalledTimes(1);
      expect(await response.json()).toEqual({
        game: "dota 2",
        userID: "id11234",
        device: "computer",
      });
    });
  });

  describe("handleRequest function", () => {
    test("should handle request when server has TypeError error", async () => {
      vi.mocked(handleRequest).mockRejectedValueOnce(new Error("TypeError"));

      const req = { body: { message: "OK" } };

      // Mock response object
      const res = {};

      await expect(handleRequest(req, res)).rejects.toThrowError("TypeError");
      expect(handleRequest).toHaveBeenCalledTimes(1);
    });
  });

  describe("handleRequest function", () => {
    test("should handle request when server has TimeoutError error", async () => {
      vi.mocked(handleRequest).mockRejectedValueOnce(new Error("TimeoutError"));

      const req = { body: { message: "OK" } };

      // Mock response object
      const res = {};

      await expect(handleRequest(req, res)).rejects.toThrowError(
        "TimeoutError"
      );
      expect(handleRequest).toHaveBeenCalledTimes(1);
    });
  });

  describe("handleRequest function", () => {
    test("should attempt the request if TimeoutError or TypeError", async () => {
      vi.mocked(handleRequest).mockRejectedValueOnce(new Error("TimeoutError"));
      vi.mocked(handleRequest).mockReturnValueOnce({
        status: 200,
        json: () =>
          Promise.resolve({
            game: "dota 2",
            userID: "id11234",
            device: "computer",
          }),
      });
      const req = { body: { message: "OK" } };

      // Mock response object
      const res = {};

      await expect(handleRequest(req, res)).rejects.toThrowError(
        "TimeoutError"
      );
      expect(handleRequest).toHaveBeenCalledTimes(2);
      expect(await response.json()).toEqual({
        game: "dota 2",
        userID: "id11234",
        device: "computer",
      });
    });
  });

  describe("handleRequest function", () => {
    test("should handle request when there are no healty instances", async () => {
      vi.mocked(handleRequest).mockReturnValueOnce({
        status: 502,
        json: () => Promise.resolve("No healthy servers available."),
      });

      const req = {
        body: { game: "dota 2", userID: "id11234", device: "computer" },
      };

      // Mock response object
      const res = {};

      const response = await handleRequest(req, res);

      expect(response.status).toEqual(502);
      expect(handleRequest).toHaveBeenCalledTimes(1);
      expect(await response.json()).toEqual("No healthy servers available.");
    });
  });
});

describe("getNextServer", () => {
  test("returns null when there is no healthy server", () => {
    vi.unmock("../routing.js");
    // Mock appInstances array with no healthy servers
    const appInstances = [
      { url: "http://localhost:4000", healthy: false },
      { url: "http://localhost:4001", healthy: false },
    ];

    const result = getNextServer(appInstances);
    expect(result).toBeNull();
  });
  test("should return the next healthy server", () => {
    // Mock appInstances array with some servers
    const appInstances = [
      { url: "http://localhost:3000", healthy: false },
      { url: "http://localhost:3005", healthy: false },
      { url: "http://localhost:3007", healthy: false },
      { url: "http://localhost:3009", healthy: true },
    ];
    const result = getNextServer(appInstances);
    expect(result).toEqual(appInstances[3]);
  });
});
