import FIGame from "@/components/game/FIGame";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";

type Props = {
  params: {
    gameId: string;
  }
}

export default async function FillInPage({params: {gameId}}: Props) {
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
          answer: true,
        }
      },
    },
  });

  if (!game || game.gameType !== "fill_in") {
    redirect("/trivia");
  }

  return (
    <>
      <FIGame game={game}/>
    </>
  )
}