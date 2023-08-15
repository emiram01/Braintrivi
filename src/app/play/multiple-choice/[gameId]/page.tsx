import MultipleChoice from "@/components/game/MultipleChoice";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";

type Props = {
  params: {
    gameId: string;
  }
}

export default async function MultipleChoicePage({params: {gameId}}: Props) {
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

  if (!game || game.gameType !== "multiple_choice") {
    redirect("/trivia");
  }

  return (
    <>
      <MultipleChoice game={game}/>
    </>
  )
}