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

let totalClients = 0;
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

    totalClients += 1;
    clients[user] = {
      ws: ws,
    };

    const partner = singles.pop();
    if (partner) {
      clients[user].partner = partner;
      clients[partner].partner = user;

      clients[user].ws.send(`Partner found: ${partner}`);
      clients[partner].ws.send(`Partner found: ${user}`);
    } else {
      singles.push(user);
      ws.send("Waiting for a partner!");
    }

    console.log("Client connected: ", user);
    console.log("Total connections :", totalClients);
  } catch (e) {
    closeConnection();
  }

  ws.on("message", (message) => {
    console.log("Received Message :", message.toString());

    ws.send(message.toString());
  });

  ws.on("close", () => {
    // also disconnect the partner as a user disconnects
    const partner = clients[user]?.partner;
    if (partner) {
      clients[partner].ws.send("Partner disconnected!");
      clients[partner].ws.close();
      delete clients[partner];
      totalClients -= 1;
    }

    delete clients[user];
    totalClients -= 1;
    console.log(`Client disconnected: ${user}`);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at  -   ${process.env.SERVER_BASE_URL}`);
});
