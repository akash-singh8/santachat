import WebSocket from "ws";
import jwt from "jsonwebtoken";
import { disconnectClient } from "./close";
import { client, singles } from "./ws";

const initiateConnection = (auth: string, ws: WebSocket) => {
  let user: string = "";
  try {
    user = jwt.verify(auth!, process.env.JWT_SECRET!) as string;
  } catch (e) {
    return disconnectClient(ws);
  }

  if (client[user]) {
    ws.send(
      JSON.stringify({
        status: 409,
        message: "Invalid request: User already connected!",
      })
    );
    return ws.close();
  }

  client[user] = {
    ws: ws,
  };

  // connecting two random users together
  const partner = singles.pop();
  if (partner) {
    client[user].partner = partner;
    client[partner].partner = user;

    client[user].ws.send(`Partner found: ${partner}`);
    client[partner].ws.send(`Partner found: ${user}`);
  } else {
    singles.push(user);
    ws.send("Waiting for a partner!");
  }

  console.log("Client connected: ", user);

  return user;
};

export default initiateConnection;
