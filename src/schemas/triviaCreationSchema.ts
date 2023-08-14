import { z } from "zod";

export const triviaCreationSchema = z.object({
    topic: z.string().min(4, {message: "Topic must be at least 4 characters long"}).max(50, {message: "Topic must not exceed 50 characters"}),
    type: z.enum(["multiple_choice", "fill_in", "true_or_false"]),
    amount: z.number().min(1).max(10),
    difficulty: z.enum(["easy", "medium", "hard"]),
})