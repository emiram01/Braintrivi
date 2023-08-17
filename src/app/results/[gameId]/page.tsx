import ScoreCard from "@/components/results/ScoreCard";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { formatTimeDelta } from "@/lib/utils";
import { differenceInSeconds } from "date-fns";
import { LayoutDashboard } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Results | Braintrivi"
}

type Props = {
  params: {
    gameId: string;
  };
}

export default async function ResultsPage({params: { gameId }}: Props) {
  const session = await getAuthSession();
  if (!session?.user) {
    redirect("/");
  }

  const game = await prisma.game.findUnique({
     where: { id: gameId },
     include: { questions: true },
  })

  if (!game) {
    redirect("/trivia");
  }

  let type: string;
  if (game.gameType === "multiple_choice") {
    type = "Multiple Choice";
  } else if (game.gameType == "fill_in") {
    type = "Fill in the Blank";
  } else {
    type = "True or False";
  }

  let accuracy: number = 0;
  if (game.gameType === "multiple_choice" || game.gameType === "true_or_false") {
    let correct = game.questions.reduce((acc, question) => {
      if (question.isCorrect) {
        return acc + 1;
      }
      return acc;
    }, 0);

    accuracy = (correct / game.questions.length) * 100;
  } else if (game.gameType === "fill_in") {
    let correctnessP = game.questions.reduce((acc, question) => {
      return acc + (question.correctness || 0);
    }, 0);

    accuracy = correctnessP / game.questions.length;
  }

  accuracy = Math.round(accuracy * 100) / 100;

  return (
    <div className="flex flex-col items-center justify-center px-4 py-10 mx-auto max-w-7xl">
      <h2 className="mb-4 flex flex-wrap items-center justify-between text-3xl font-bold w-full">
        Results
        <Link
          className="flex gap-2 items-center bg-rose-400 text-white font-semibold text-base md:text-xl p-2 px-3 rounded-lg hover:bg-rose-500 disabled:bg-gray-400 disabled:hover:bg-gray-400"
          href="/dashboard"
        >
          Dashboard <LayoutDashboard />
        </Link>
      </h2>
      <ScoreCard topic={ game.topic.toUpperCase() } difficulty={ game.gameDifficulty } type={ type } accuracy={ accuracy } questions= { game.questions }/>
    </div>
  )
}