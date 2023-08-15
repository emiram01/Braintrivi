import { z } from "zod";

export const checkAnswerSchema = z.object({
    questionId: z.string(),
    userAnswer: z.string(),
});