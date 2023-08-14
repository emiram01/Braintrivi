// import { getAuthSession } from "@/lib/nextauth";
// import { NextResponse } from "next/server";
// import { triviaCreationSchema } from "@/schemas/triviaCreationSchema";
// import { ZodError } from "zod";
// import { prisma } from "@/lib/db";

// // POST api/game
// export async function POST(req:Request, res: Response) {
//     const session = await getAuthSession();
//     if (!session?.user) {
//         return NextResponse.json(
//             { error: "Must be logged in to play.", }, 
//             { status: 401, },
//         );
//     }

//     try {
//         const body = await req.json();
//         const { amount, topic, type, difficulty } = triviaCreationSchema.parse(body);
//         const game = await prisma.game.create({

//         })
//     } catch (error) {
//         if (error instanceof ZodError) {
//             return NextResponse.json(
//                 { error: error.issues, },
//                 { status: 400, },
//             )
//         }
//     }
// }