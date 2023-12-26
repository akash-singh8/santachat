import jwt from "jsonwebtoken";

export const generateLink = (email: string) => {
  const link = jwt.sign({ email }, process.env.JWT_LINK_SECRET!, {
    expiresIn: "5m",
  });

  return `${process.env.CLIENT_BASE_URL!}/verify?user=${link}}`;
};
