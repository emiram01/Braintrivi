import HistoryCard from "@/components/dashboard/HistoryCard";
import NewGameCard from "@/components/dashboard/NewGameCard";
import TrendingCard from "@/components/dashboard/TrendingCard";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import type { Metadata } from 'next'
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'Dashboard | Braintrivi',
}

export default async function Dashboard() {
  const session = await getAuthSession();
  if (!session?.user) {
    redirect("/");
  }

  const gamesPlayed = await prisma.game.count({
    where: { userId: session.user.id }
  })

  return ( 
    <main className="px-4 py-10 mx-auto max-w-7xl">
      <h2 className="mr-2 mb-2 text-3xl font-bold">Dashboard</h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="md:col-span-1">
          <div className="grid grid-cols-1 gap-4">
            <NewGameCard />
            <TrendingCard />
          </div>
        </div>
        <div className="md:col-span-1">
          <HistoryCard limit={5} userId={session.user.id} seeMore={true} gamesPlayed={gamesPlayed} />
        </div>
      </div>
    </main> 
  )
}