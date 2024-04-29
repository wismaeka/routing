import express from "express";
import routes from "./routes/game.js";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// routes
app.use("/", routes);

const ports = [3000, 3001, 3002];

ports.forEach((port) => {
  app.listen(port, () => {
    console.log("Express started. Listening on %s", port);
  });
});
