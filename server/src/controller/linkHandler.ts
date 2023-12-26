import jwt from "jsonwebtoken";

export const generateLink = (email: string) => {
  const token = jwt.sign({ email }, process.env.JWT_SECRET!, {
    expiresIn: "5m",
  });

  const link = `${process.env.CLIENT_BASE_URL!}/verify?user=${token}`;

  return link;
};
