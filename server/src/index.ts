import dotenv from "dotenv";
dotenv.config();

import express from "express";
import routes from "./routes";
import cors from "cors";

import { connect } from "./db/database";

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);

app.use(express.json());

try {
  app.use("/", routes);
} catch (error) {
  console.log(error);
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, async () => {
  await connect();
  console.log(`Server started at http://localhost:${port}`);
});
