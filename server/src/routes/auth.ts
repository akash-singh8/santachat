import { Router } from "express";
import sendEmail from "../controller/sendEmail";
import { verifyLink } from "../controller/linkHandler";
import universityDomain from "../utils/universityDomain";

const authRouter = Router();

authRouter.post("/sendlink", (req, res) => {
  const email = req.query.user as string;

  if (!email || !universityDomain.includes(email.split("@")[1])) {
    return res.status(400).json({ message: "Invalid email address!" });
  }

  sendEmail(email);
  res.status(201).json({ message: "Successfully Send Verification Email." });
});

authRouter.post("/verify", verifyLink);

export default authRouter;
