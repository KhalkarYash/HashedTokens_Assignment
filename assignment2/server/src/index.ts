import { config } from "dotenv";
config();
import express, { Request, Response } from "express";
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

app.get("/", async(req: Request, res: Response) => {
  res.status(200).json({ message: "Backend for Hashed Tokens Assignment 2" })
})

app.get("/api/folders", async (req: Request, res:Response) => {
  try {
    const rootFolders = await Folder.find({});
    res.status(200).json(rootFolders);
  } catch (err) {
    console.log(err);
  }
});

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
  connectDB()
    .then(() => {
      console.log("Database connected successfully...");
      console.log(`Server is running on ${PORT}...`);
    })
    .catch(() => {
      console.log("Database connection failed...");
    });
});
