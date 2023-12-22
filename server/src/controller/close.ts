import { WebSocket } from "ws";
import { client } from "./ws";

export const wsCloseHandler = (user: string) => {
  const partner = client[user]?.partner;
  if (partner) {
    client[partner].ws.send("Partner disconnected!");
    client[partner].ws.close();
    delete client[partner];
  }

  if (client[user]) {
    delete client[user];
  }
  console.log(`Client disconnected: ${user}`);
};

export const disconnectClient = (ws: WebSocket) => {
  ws.send(
    JSON.stringify({
      status: 401,
      message: "Invalid request: Unauthorized!",
    })
  );
  ws.close();
};
