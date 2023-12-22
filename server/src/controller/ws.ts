import http from "http";
import { WebSocket } from "ws";
import { disconnectClient, wsCloseHandler } from "./close";
import initiateConnection from "./initiate";
import { prisma } from "../index";

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

  ws.on("message", async (message) => {
    const partner = client[user].partner;
    if (!partner) {
      return ws.send("Partner not found!");
    }

    const msg = message.toString();
    client[partner].ws.send(msg);

    // store message in the database
    try {
      await prisma.chat.create({
        data: {
          message: msg,
          fromUser: partner,
          toUser: user,
        },
      });
    } catch (e) {
      console.error("Error while storing message: ");
      console.log(e);
    }
  });

  ws.on("close", () => {
    totalClients -= 1;
    if (!client[user]?.partner) singles.pop();
    wsCloseHandler(user);
  });
};

export default wsConnectionHandler;
