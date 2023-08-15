import { NextResponse } from "next/server"
import { triviaCreationSchema } from "@/schemas/triviaCreationSchema";
import { ZodError } from "zod";
import { strict_output } from "@/lib/gpt";
import { headers } from "next/headers"

// POST api/questions 
export const POST = async (req: Request, res: Response) => {
    const session = await headers().get("authorization");

    if (!session) {
        return NextResponse.json(
            { error: "Must be logged in to play.", }, 
            { status: 401, },
        );
    }

    try {
        const body = await req.json();
        const { amount, topic, type, difficulty } = triviaCreationSchema.parse(body);
        let questions: any;
        if (type === "fill_in") {
            questions = await strict_output(
                "You are a helpful AI that is able to generate a pair of questions and answers, the answer should not exceed 15 words, store all the pairs of answers and questions in JSON",
                new Array(amount).fill(`You are to generate a random open-ended question about ${ topic }. The difficulty of the question should be ${ difficulty }.`),
                {
                    question: "question",
                    answer: "answer with max length of 15 words",
                },
            )
        } else if (type === "multiple_choice") {
            questions = await strict_output(
                "You are a helpful AI that is able to generate multiple choice questions and answers, the length of each answer should not exceed 15 words, store all the pairs of answers and questions in JSON",
                new Array(amount).fill(`You are to generate a random multiple choice question about ${ topic }. The difficulty of the question should be ${ difficulty }.`),
                {
                    question: "question",
                    answer: "answer with max length of 15 words",
                    option1: "1st option with max length of 15 words",
                    option2: "2nd option with max length of 15 words",
                    option3: "3rd option with max length of 15 words",
                },
            )
        } else if (type === "true_or_false") {
            questions = await strict_output(
                "You are a helpful AI that is able to generate true or false questions, store all the pairs of answers and questions in JSON",
                new Array(amount).fill(`You are to generate a random true or false question about ${ topic }. The difficulty of the question should be ${ difficulty }.`),
                {
                    question: "question",
                    answer: "answer, could only be \"true\" or \"false\"",
                    option1: "other option, could only be \"true\" or \"false\"",
                },
            )
        }
        return NextResponse.json(
            { questions, }, 
            { status: 200, },
        );
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                { error: error.issues, },
                { status: 400, },
            )
        }
    }
}