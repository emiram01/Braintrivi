import { getAuthSession } from "@/lib/nextauth";
import { NextResponse } from "next/server";
import { triviaCreationSchema } from "@/schemas/triviaCreationSchema";
import { ZodError } from "zod";
import { prisma } from "@/lib/db";
import axios from "axios";

// POST api/game
export async function POST(req:Request, res: Response) {
    const session = await getAuthSession();

    if (!session?.user) {
        return NextResponse.json(
            { error: "Must be logged in to play.", }, 
            { status: 401, },
        );
    }

    try {
        const body = await req.json();
        const { amount, topic, type, difficulty } = triviaCreationSchema.parse(body);
        const game = await prisma.game.create({
            data: {
                gameType: type,
                gameDifficulty: difficulty,
                timeStarted: new Date(),
                userId: session.user.id,
                topic,
            }
        });
        
        await prisma.topicCount.upsert({
            where: { topic },
            create: {
                topic,
                count: 1
            },
            update: {
                count: { increment: 1 }
            }
        })

        const { data } = await axios.post(`${process.env.URL}/api/questions`, {
            amount, topic, type, difficulty
        }, {
            headers: {
                Authorization: `Bearer ${session.user}`
            }
        });

        if (type === "multiple_choice") {
            type mcQuestion = {
                question: string,
                answer: string,
                option1: string,
                option2: string,
                option3: string,
            }
            let qData = data.questions.map((q: mcQuestion) => {
                let options = [q.answer, q.option1, q.option2, q.option3].sort(() => Math.random() - 0.5)
                return {
                    question: q.question,
                    answer: q.answer,
                    options: JSON.stringify(options),
                    gameId: game.id,
                    questionType: "multiple_choice",
                }
            })
            await prisma.question.createMany({
                data: qData,
            })
        } else if (type === "fill_in") {
            type fiQuestion = {
                question: string,
                answer: string,
            }
            let qData = data.questions.map((q: fiQuestion) => {
                return {
                    question: q.question,
                    answer: q.answer,
                    gameId: game.id,
                    questionType: "fill_in",
                }
            })
            await prisma.question.createMany({
                data: qData,
            })
        } else if (type === "true_or_false") {
            type tfQuestion = {
                question: string,
                answer: string,
                option1: string,
            }
            let qData = data.questions.map((q: tfQuestion) => {
                let options = [q.answer, q.option1].sort(() => Math.random() - 0.5)
                return {
                    question: q.question,
                    answer: q.answer,
                    options: JSON.stringify(options),
                    gameId: game.id,
                    questionType: "true_or_false",
                }
            })
            await prisma.question.createMany({
                data: qData,
            })
        }
        return NextResponse.json({
            gameId: game.id,
        })
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                { error: error.issues, },
                { status: 400, },
            );
        }
        return NextResponse.json(
            { error: ":/ Something went wrong." },
            { status: 500 },
        );
    }
}