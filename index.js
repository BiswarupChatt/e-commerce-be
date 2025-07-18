import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello from ES6 + Express 5!");
});

app.listen(PORT, () => {
  console.log(
    `Server is running successfully on this url http://localhost:${PORT}`
  );
});
