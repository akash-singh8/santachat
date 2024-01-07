import { Router } from "express";
import { fetchFeedbacks, storeFeedback } from "../controller/feedback";

const feedbackRouter = Router();

feedbackRouter.post("/", storeFeedback);

feedbackRouter.get("/", fetchFeedbacks);

export default feedbackRouter;
