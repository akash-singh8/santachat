import { WebSocket } from "ws";
import { client } from "./ws";
import { handleUserWithInterest, handleUserWithNoInterest } from "./initiate";

export const wsCloseHandler = (user: string) => {
  const partner = client[user].partner;

  // no need to remove the partner, just add them to the waiting list or connect them with someone in the waiting list
  if (partner) {
    client[partner].partner = undefined;
    client[partner].ws.send(
      JSON.stringify({ status: 303, message: "Partner disconnected!" })
    );

    const { interests, ws } = client[partner];
    if (interests && interests[0].length) {
      handleUserWithInterest(partner, interests, ws);
    } else {
      handleUserWithNoInterest(partner, ws);
    }
  }
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
