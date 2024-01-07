import { Request, Response } from "express";
import { prisma } from "../index";
import { client } from "../controller/ws";
import feedbackSchema from "../validation/feedback";

export const storeFeedback = async (req: Request, res: Response) => {
  const user = req.body.user;
  const data = {
    user: user,
    to: client[user].partner || "",
    feedback: req.body.feedback,
    rating: parseInt(req.body.rating || "0"),
    createdAt: req.body.time,
  };

  const validData = feedbackSchema.safeParse(data);

  if (!validData.success) {
    return res.status(400).json({ message: "Invalid Request!" });
  }

  try {
    await prisma.feedback.create({
      data,
    });

    res.status(201).json({ message: "Feedback submitted successfully!" });
  } catch (e) {
    console.log("Error on storing feedback");
    console.error(e);
    res.status(500).json({ message: "Server Side Error!" });
  }
};
