import { Request, Response } from "express";
import jwt from "jsonwebtoken";

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

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;
    console.log(user.email);

    // this is right place to store user in the database
    // also that's where we need to provide a auth token to the user
    res.status(200).json({ message: "Successfully Verified Email." });
  } catch (err) {
    res
      .status(401)
      .json({ message: "Unauthorized, Invalid or Expired token!" });
  }
};
