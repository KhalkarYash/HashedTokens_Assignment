import { config } from "dotenv";
config();
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db";
import Folder from "./models/Folder";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT,
    credentials: true,
  })
);

app.get("/api/folders", async (req, res) => {
  try {
    const rootFolders = await Folder.find({});
    res.json(rootFolders);
  } catch (err) {
    console.log(err);
  }
});

app.listen(process.env.PORT, () => {
  connectDB()
    .then(() => {
      console.log("Database connected successfully...");
      console.log(`Server is running on ${process.env.PORT}...`);
    })
    .catch(() => {
      console.log("Database connection failed...");
    });
});
