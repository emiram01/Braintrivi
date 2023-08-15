import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { checkAnswerSchema } from "@/schemas/checkAnswerSchema";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

// POST api/checkAnswer
export async function POST(req: Request, res: Response) {
    const session = await getAuthSession();

    if (!session?.user) {
        return NextResponse.json(
            { error: "Must be logged in to play.", }, 
            { status: 401, },
        );
    }

    try {
        const body = await req.json();
        const { questionId, userAnswer, } = checkAnswerSchema.parse(body);
        const question = await prisma.question.findUnique({
            where: { id: questionId, },
        });

        if (!question) {
            return NextResponse.json(
                { error: "Question not found.", },
                { status: 400, },
            );
        }

        await prisma.question.update({
            where: { id: questionId, },
            data: { userAnswer, },
        });

        if (question.questionType === "multiple_choice" || question.questionType === "true_or_false") {
            const isCorrect = question.answer.toLowerCase().trim() === userAnswer.toLowerCase().trim();
            await prisma.question.update({
                where: { id: questionId, },
                data: { isCorrect, },
            });

            return NextResponse.json(
                { isCorrect, },
                { status: 200, },
            );
        }
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                { error: error.issues, },
                { status: 400, },
            );
        }
    }
}