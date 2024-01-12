import http from "http";
import { WebSocket } from "ws";
import { disconnectClient, wsCloseHandler } from "./close";
import initiateConnection from "./initiate";
import { prisma } from "../index";

type wsClients = {
  [name: string]: {
    partner?: string;
    interests?: string[];
    ws: WebSocket;
  };
};

type WaitingClient_Interst = {
  [club: string]: {
    [client: string]: boolean;
  };
};

const interests = [
  "Clubs",
  "Rooms",
  "Study",
  "Chill",
  "Freshman",
  "Sophomore",
  "Junior",
  "Senior",
];
let totalClients = 0;
export const client: wsClients = {};
export const waitingClients_NoInterest: string[] = [];
export const waitingClients_Interest: WaitingClient_Interst = {};

interests.forEach((i) => {
  waitingClients_Interest[i] = {};
});

const wsConnectionHandler = (ws: WebSocket, req: http.IncomingMessage) => {
  const url = new URL(req.url!, `${process.env.SERVER_BASE_URL}`);
  const auth = url.searchParams.get("auth");
  if (!auth) return disconnectClient(ws);

  const userInterest = url.searchParams.get("interests")?.split("_");
  const user = initiateConnection(auth, ws, userInterest);
  if (!user) return;

  totalClients += 1;
  console.log("Total connections :", totalClients);

  ws.on("message", async (message) => {
    const partner = client[user].partner;
    if (!partner) {
      return ws.send(
        JSON.stringify({
          status: 404,
          message: "Partner not found!",
        })
      );
    }

    const msg = JSON.parse(message.toString());
    client[partner].ws.send(
      JSON.stringify({
        status: 200,
        message: msg.message,
        image: msg.image,
      })
    );

    // store message in the database
    try {
      await prisma.chat.create({
        data: {
          message: msg.message,
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

    // we don't need to remove both of the clients, instead we'll remove the current client and add the other client in waiting list
    const userInterest = client[user].interests;

    if (userInterest && userInterest[0].length) {
      userInterest.forEach((interest) => {
        delete waitingClients_Interest[interest][user];
      });
    } else {
      waitingClients_NoInterest.pop();
    }

    wsCloseHandler(user);

    delete client[user];
    console.log(`Client disconnected: ${user}`);
  });
};

export default wsConnectionHandler;
