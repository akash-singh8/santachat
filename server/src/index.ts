import express from "express";
import http from "http";
import { WebSocketServer, WebSocket } from "ws";
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

type wsClients = {
  [name: string]: {
    partner?: string;
    ws: WebSocket;
  };
};

const clients: wsClients = {};
const singles: string[] = [];

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

  let user: string;
  try {
    user = jwt.verify(auth!, process.env.JWT_SECRET!) as string;

    if (clients[user]) {
      ws.send(
        JSON.stringify({
          status: 409,
          message: "Invalid request: Client already connected!",
        })
      );
      ws.close();
      return;
    }

    clients[user] = {
      ws: ws,
    };
    singles.push(user);

    console.log("Client connected: ", user);
    console.log("Total connections :", Object.keys(clients).length);
  } catch (e) {
    closeConnection();
  }

  ws.on("message", (message) => {
    console.log("Received Message :", message.toString());

    ws.send(message.toString());
  });

  ws.on("close", () => {
    console.log(`Client disconnected: ${user}`);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at  -   ${process.env.SERVER_BASE_URL}`);
});
