import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authorizeUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized!" });
  }

  let user: string;
  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as jwt.JwtPayload;

    user = payload.email;
  } catch (e) {
    return res.status(403).json({ message: "Invalid or Expired Token!" });
  }

  req.body.user = user;
  next();
};

export default authorizeUser;
