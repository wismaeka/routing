import express from "express";
import bodyParser from "body-parser";
import router from "./routes/route.js";

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", router);

const port = 4000;

app.listen(port, () => {
  console.log(`Round Robin API running on port ${port}`);
});

export default app;
