import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";
import wsConnectionHandler from "./controller/ws";
import authRouter from "./routes/auth";

config();
const app = express();
app.use("/auth", authRouter);

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
