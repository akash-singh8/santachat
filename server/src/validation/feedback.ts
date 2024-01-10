import { z } from "zod";

const feedbackSchema = z.object({
  user: z.string().email(),
  to: z.string().email(),
  feedback: z.string(),
  rating: z
    .number()
    .min(0, "Rating must be greater than or equal to 0")
    .max(5, "Rating must be less than or equal to 5"),
  createdAt: z.date(),
});

export default feedbackSchema;
