import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../index";

export const generateLink = (email: string) => {
  const token = jwt.sign({ email }, process.env.JWT_SECRET!, {
    expiresIn: "5m",
  });

  const link = `${process.env.CLIENT_BASE_URL!}/verify?user=${token}`;

  return link;
};

export const verifyLink = async (req: Request, res: Response) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized!" });
  }

  // also that's where we need to provide a auth token to the user
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;

    const upsertUser = await prisma.user.upsert({
      where: {
        email: user.email,
      },
      update: {
        createdAt: new Date(),
      },
      create: {
        email: user.email,
        createdAt: new Date(),
      },
    });
    console.log(upsertUser);

    res.status(200).json({ message: "Successfully Verified Email." });
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ message: "Invalid or Expired token!" });
    } else {
      res
        .status(500)
        .json({ message: "Server side error on link verification!" });
    }
  }
};
