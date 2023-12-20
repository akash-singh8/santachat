import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import { config } from "dotenv";

config();
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3053;

const wss = new WebSocketServer({ server });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to SANTaCHAT Backend!" });
});

wss.on("connection", (ws, req) => {
  console.log("Client Connected");

  ws.on("message", (message) => {
    console.log("Received Message :", message.toString());

    ws.send(message.toString());
  });

  ws.on("close", () => {
    console.log(`Client  disconnected`);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at  -   ${process.env.SERVER_BASE_URL}`);
});
