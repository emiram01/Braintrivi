import HistoryCard from "@/components/dashboard/HistoryCard";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/nextauth";
import { LayoutDashboard } from "lucide-react";
import type { Metadata } from 'next'
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'History | Braintrivi',
}

export default async function History() {
  const session = await getAuthSession();
  if (!session?.user) {
    redirect("/");
  }

  const gamesPlayed = await prisma.game.count({
    where: { userId: session.user.id }
  })

  return ( 
    <div className="px-4 py-10 mx-auto max-w-3xl">
      <h2 className="mb-4 flex flex-wrap items-center justify-between text-3xl font-bold w-full">
        History
        <Link
          className="flex gap-2 tems-center bg-rose-400 text-white font-semibold text-base md:text-xl p-2 px-3 rounded-lg hover:bg-rose-500"
          href="/dashboard"
        >
          Dashboard <LayoutDashboard />
        </Link>
      </h2>
      <HistoryCard limit={ gamesPlayed } userId={ session.user.id } seeMore={ false } gamesPlayed={ gamesPlayed } />
    </div>  
  )
}