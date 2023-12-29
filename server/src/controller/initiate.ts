import WebSocket from "ws";
import jwt from "jsonwebtoken";
import { disconnectClient } from "./close";
import {
  client,
  waitingClients_NoInterest,
  waitingClients_Interest,
} from "./ws";

const initiateConnection = (
  auth: string,
  ws: WebSocket,
  userInterest?: string[]
) => {
  let user: string;
  try {
    const payload = jwt.verify(
      auth!,
      process.env.JWT_SECRET!
    ) as jwt.JwtPayload;
    user = payload.email;
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
    interests: userInterest,
    ws: ws,
  };

  if (userInterest) {
    // Connecting two user with similar interest
    let partnerFound = false;

    userInterest.forEach((interest) => {
      const availableClients = Object.keys(waitingClients_Interest[interest]);

      if (availableClients.length > 0) {
        const partner = availableClients[0];
        client[user].partner = partner;
        client[partner].partner = user;

        // remove the partner from all the waitingClients object
        const partnerInterest = client[partner].interests;
        partnerInterest?.forEach((interest) => {
          delete waitingClients_Interest[interest][partner];
        });

        client[user].ws.send(
          JSON.stringify({
            status: 202,
            message: `Partner found: ${partner}`,
          })
        );
        client[partner].ws.send(
          JSON.stringify({
            status: 202,
            message: `Partner found: ${user}`,
          })
        );

        partnerFound = true;
        return;
      }
    });

    // store current user with their interests, in waitingClients object
    if (!partnerFound) {
      userInterest?.forEach((interest) => {
        waitingClients_Interest[interest][user] = true;
      });
      ws.send(
        JSON.stringify({
          status: 201,
          message: "Waiting for a partner!",
        })
      );
    }
  } else {
    // connecting two users with no interests
    const partner = waitingClients_NoInterest.pop();
    if (partner) {
      client[user].partner = partner;
      client[partner].partner = user;

      client[user].ws.send(
        JSON.stringify({
          status: 202,
          message: `Partner found: ${partner}`,
        })
      );
      client[partner].ws.send(
        JSON.stringify({
          status: 202,
          message: `Partner found: ${user}`,
        })
      );
    } else {
      waitingClients_NoInterest.push(user);
      ws.send(
        JSON.stringify({
          status: 201,
          message: "Waiting for a partner!",
        })
      );
    }
  }

  console.log("Client connected: ", user);

  return user;
};

export default initiateConnection;
