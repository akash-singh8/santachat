import http from "http";
import { WebSocket } from "ws";
import { disconnectClient, wsCloseHandler } from "./close";
import initiateConnection from "./initiate";

type wsClients = {
  [name: string]: {
    partner?: string;
    ws: WebSocket;
  };
};

let totalClients = 0;
export const client: wsClients = {};
export const singles: string[] = [];

const wsConnectionHandler = (ws: WebSocket, req: http.IncomingMessage) => {
  const auth = req.headers.authorization?.split(" ")[1];
  if (!auth) return disconnectClient(ws);

  const user = initiateConnection(auth, ws);
  if (!user) return;

  totalClients += 1;
  console.log("Total connections :", totalClients);

  ws.on("message", (message) => {
    console.log("Received Message :", message.toString());

    ws.send(message.toString());
  });

  ws.on("close", () => {
    totalClients -= 1;
    if (!client[user]?.partner) singles.pop();
    wsCloseHandler(user);
  });
};

export default wsConnectionHandler;
