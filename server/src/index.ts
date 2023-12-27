import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";
import wsConnectionHandler from "./controller/ws";
import authRouter from "./routes/auth";
import cors from "cors";

config();
const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_BASE_URL,
    methods: "POST",
  })
);
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
