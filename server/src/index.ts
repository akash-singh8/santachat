import express from "express";
import http from "http";
import { WebSocketServer } from "ws";
import { config } from "dotenv";
import jwt from "jsonwebtoken";

config();
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3053;

const wss = new WebSocketServer({ server });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to SANTaCHAT Backend!" });
});

wss.on("connection", (ws, req) => {
  const closeConnection = () => {
    ws.send(
      JSON.stringify({
        status: 401,
        message: "Invalid request: Unauthorized!",
      })
    );
    ws.close();
    return;
  };

  const auth = req.headers.authorization?.split(" ")[1];
  if (!auth) closeConnection();

  try {
    const user = jwt.verify(auth!, process.env.JWT_SECRET!);
    console.log("Client Connected", user);
  } catch (e) {
    closeConnection();
  }

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
