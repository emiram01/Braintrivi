import { prisma } from "@/lib/db";
import { ChevronRight, CopyCheck, HelpCircle, History, PencilLine } from "lucide-react";
import Link from "next/link";

type Props = {
  limit: number;
  userId: string;
  seeMore: boolean;
  gamesPlayed: number;
}

export default async function HistoryCard({ limit, userId, seeMore, gamesPlayed }: Props) {
  const games = await prisma.game.findMany({
    take: limit,
    where: {
      userId,
    },
    orderBy: {
      timeStarted: "desc",
    },
  });

  return (
    <div className="w-full p-6 bg-white border-2 border-rose-100 rounded-lg shadow shadow-rose-50">
      {seeMore && 
        <>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 flex items-center justify-between">
            History
            <History />
          </h5>
          <p className="mb-3 font-normal text-gray-700">You have generated a total of { gamesPlayed } trivia games!</p>
        </>
      }

      <div className="flex flex-col gap-4 mt-10">
        {games.map((game) => {
          return (
            <div className="flex items-center" key={game.id}>
              <div className="flex items-center gap-3 w-full border-b border-rose-100 pb-4">
                { game.gameType === "multiple_choice" ? <CopyCheck /> : game.gameType === "fill_in" ? <PencilLine /> : <HelpCircle /> }
                <div className="ml-4 space-y-1 w-full">
                  <p className="text-base font-medium"
                  >
                    { game.topic.toUpperCase() }
                  </p>
                  <div className="flex flex-wrap gap-x-4 justify-between w-full items-center">
                    <div className="flex gap-2">
                      <p className={`flex gap-2 font-semibold ${game.gameDifficulty && game.gameDifficulty === "easy" ? "text-lime-500" : game.gameDifficulty === "medium" ? "text-orange-300" : "text-red-500"}`}>
                        { game.gameDifficulty[0] && game.gameDifficulty[0].toUpperCase() + game.gameDifficulty.slice(1)  }
                      </p>
                      |
                      <p>
                        { game.gameType === "multiple_choice" ? "Multiple Choice" : game.gameType === "fill_in" ? "Fill in the Blank" : "True or False" }
                      </p>
                    </div>
                    <Link 
                      href={`/results/${game.id}`} 
                      className="flex gap-1 items-center text-rose-400 hover:text-rose-500">
                        View Results <ChevronRight />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      { seeMore && <Link href={'/history'} className="flex mt-5 gap-1 items-center font-semibold text-rose-400 hover:text-rose-500 justify-center mx-auto w-32">
        See More <ChevronRight />
      </Link> }
    </div>
  )
}