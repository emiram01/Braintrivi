import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";

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
     where: { id: gameId }
  })

  if (!game) {
    redirect("/trivia");
  }

  return (
    <div className="flex flex-col w-full p-6 bg-white border-2 border-rose-100 rounded-lg shadow">
      <div className="flex"></div>
    </div>
  )
}