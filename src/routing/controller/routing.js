const controller = new AbortController();

import { appInstances } from "../../ports.js";

async function handleRequest(req, res, _, attempt = 1) {
  const server = getNextServer(appInstances);
  if (!server) {
    return res.status(502).json("No healthy servers available.");
  }

  try {
    console.log("this request going to: ", server.url);
    return await requestToInstance(
      server.url,
      req,
      res,
      AbortSignal.timeout(5000)
    );
  } catch (error) {
    if (error.name === "TypeError" || error.name === "TimeoutError") {
      console.error(
        `Failed to get response from ${server.url}, error: ${error}`
      );
      server.healthy = false; // Mark server as unhealthy
      console.log(`Marking ${server.url} as unhealthy.`);
    }
    // Retry the next available server
    if (attempt < appInstances.length) {
      console.log(`Retrying request, attempt: ${attempt}`);
      return handleRequest(req, res, attempt + 1);
    } else {
      return res.status(502).json("All servers failed to respond.");
    }
  }
}

let currentIndex = 0;
function getNextServer(appInstances) {
  const start = currentIndex;
  do {
    const server = appInstances[currentIndex];
    currentIndex = (currentIndex + 1) % appInstances.length;
    if (server.healthy) {
      return server;
    }
  } while (start !== currentIndex);
  return null;
}

async function requestToInstance(url, req, res, signal) {
  try {
    const response = await fetch(url + "/game", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
      signal,
    });
    const data = await response.json();
    return res.json(data);
  } catch (error) {
    throw error;
  }
}

export { handleRequest, getNextServer, requestToInstance };
