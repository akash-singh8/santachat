import { Router } from "express";
import sendEmail from "../controller/sendEmail";
import { verifyLink } from "../controller/linkHandler";

const authRouter = Router();

authRouter.post("/sendlink", (req, res) => {
  const email = req.query.user as string;

  if (!email || !email.endsWith(process.env.DOMAIN!)) {
    return res.status(400).json({ message: "Invalid email address!" });
  }

  sendEmail(email);
  res.status(201).json({ message: "Successfully Send Verification Email." });
});

authRouter.post("/verify", verifyLink);

export default authRouter;
