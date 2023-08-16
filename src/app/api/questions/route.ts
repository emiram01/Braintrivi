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
                `You are a helpful AI tasked with generating open ended questions and answers. Please follow these guidelines to ensure correct formatting:

                1. Each question should have a question and an answer.
                2. The answer generated should be at most 5 words long.
                3. Diffiulty ranges between easy, medium, and hard where easy questions are more so common knowledge and hard questions should be more obscure knowledge on the given topic. The question difficulty you are generating is ${ difficulty }.
                4. Generate exactly ${ amount } ditstinct questions.
                5. The output should adhere to valid JSON format.
                
                Please follow this valid JSON format example for each question:
                
                [
                    {
                        "question": "How many sides does a square have",
                        "answer": "Four"
                    },
                    {
                        "question": "What sound does a cat make?",
                        "answer": "Meow"
                    },
                    {
                        "question": "What is the closest planet to the sun?",
                        "answer": "Mercury"
                    }
                ]`,
                new Array(amount).fill(`You are to generate a random open-ended question about ${ topic }. The difficulty of the question should be ${ difficulty }.`),
                {
                    question: "question",
                    answer: "answer with max length of 5 words",
                },
            )
        } else if (type === "multiple_choice") {
            questions = await strict_output(
                `You are a helpful AI tasked with generating multiple choice questions and answers. Please follow these guidelines to ensure correct formatting:

                1. Each question should have a question and a set of options.
                2. The length of each option should not exceed 10 words.
                3. Do NOT reuse the same option.
                4. Diffiulty ranges between easy, medium, and hard where easy questions are more so common knowledge and hard questions should be more obscure knowledge on the given topic. The question difficulty you are generating is ${ difficulty }.
                5. Generate exactly ${ amount } ditstinct questions.
                6. The output should adhere to valid JSON format.
                
                Please follow this valid JSON format example for each question:
                
                [
                    {
                        "question": "How many sides does a square have?",
                        "answer": "Four",
                        "option1": "One",
                        "option2": "Five",
                        "option3": "Two"
                    },
                    {
                        "question": "What sound does a cat make?",
                        "answer": "Meow",
                        "option1": "Moo",
                        "option2": "Woof",
                        "option3": "Roar"
                    },
                    {
                        "question": "What planet is closest to the sun?",
                        "answer": "Mercury",
                        "option1": "Earth",
                        "option2": "Venus",
                        "option3": "Mars"
                    }
                ]`,
                new Array(amount).fill(`You are to generate a random multiple choice question about ${ topic }. The difficulty of the question should be ${ difficulty }.`),
                {
                    question: "question",
                    answer: "answer with max length of 10 words",
                    option1: "1st option with max length of 10 words",
                    option2: "2nd option with max length of 10 words",
                    option3: "3rd option with max length of 10 words",
                },
            )
        } else if (type === "true_or_false") {
            questions = await strict_output(
                `You are a helpful AI tasked with generating true or false questions and answers. Please follow these guidelines to ensure correct formatting:

                1. Each question should have a question and a set of options.
                2. Only 2 options, either True or False.
                3. Diffiulty ranges between easy, medium, and hard where easy questions are more so common knowledge and hard questions should be more obscure knowledge on the given topic. The question difficulty you are generating is ${ difficulty }.
                4. Generate exactly ${ amount } ditstinct questions.
                5. The output should adhere to valid JSON format.
                
                Please follow this valid JSON format example for each question:
                
                [
                    {
                        "question": "A square has four sides.",
                        "answer": "True",
                        "option1": "False"
                    },
                    {
                        "question": "The sound a cat makes is woof.",
                        "answer": "False",
                        "option1": "True"
                    },
                    {
                        "question": "Mercury is the closest planet to the sun.",
                        "answer": "True",
                        "option1": "False"
                    }
                ]`,
                new Array(amount).fill(`You are to generate a random true or false question about ${ topic }. The difficulty of the question should be ${ difficulty }.`),
                {
                    question: "question",
                    answer: "answer, could only be \"True\" or \"False\"",
                    option1: "other option, could only be \"True\" or \"False\"",
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