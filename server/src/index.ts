import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";
import wsConnectionHandler from "./controller/ws";

config();
const app = express();
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
