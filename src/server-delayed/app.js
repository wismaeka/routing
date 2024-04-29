// This server is a simple express server that listens on port 3005.
// It has a single route that listens for POST requests to / game.When a request is received, the server waits for 5 seconds before responding with the request body.
// This server is used to simulate a slow server response.

import express from "express";
import routes from "./routes/game.js";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// routes
app.use("/", routes);

const port = 3005;

app.listen(port, () => {
  console.log("Express started 3005. Listening on %s", port);
});
