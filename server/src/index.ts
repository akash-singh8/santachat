import express from "express";
import http from "http";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { WebSocketServer } from "ws";
import { config } from "dotenv";

import wsConnectionHandler from "./controller/ws";
import authRouter from "./routes/auth";
import authorizeUser from "./middleware/auth";
import feedbackRouter from "./routes/feedback";

config();
const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_BASE_URL,
    methods: "POST",
  })
);
app.use("/auth", authRouter);
app.use("/feedback", authorizeUser, feedbackRouter);

const server = http.createServer(app);
const PORT = process.env.PORT || 3053;
export const prisma = new PrismaClient();

const wss = new WebSocketServer({ server });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to SANTaCHAT Backend!" });
});

wss.on("connection", wsConnectionHandler);

server.listen(PORT, () => {
  console.log(`Server running at  -   ${process.env.SERVER_BASE_URL}`);
});
