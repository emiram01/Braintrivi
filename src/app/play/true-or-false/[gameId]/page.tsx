import MCTFGame from "@/components/game/MCTFGame";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";

type Props = {
  params: {
    gameId: string;
  }
}

export default async function TrueOrFalsePage({params: {gameId}}: Props) {
  const session = await getAuthSession();
  if (!session?.user) {
    redirect("/");
  }

  const game = await prisma.game.findUnique({
    where: {
      id: gameId,
    },
    include: {
      questions: {
        select: {
          id: true,
          question: true,
          options: true,
        }
      },
    },
  });

  if (!game || game.gameType !== "true_or_false") {
    redirect("/trivia");
  }

  return (
    <>
      <MCTFGame game={game}/>
    </>
  )
}