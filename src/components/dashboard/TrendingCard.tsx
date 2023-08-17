import { prisma } from "@/lib/db";
import { ChevronRight, TrendingUp } from "lucide-react";
import Link from "next/link";

export default async function TrendingCard() {
  const topics = await prisma.topicCount.findMany({
    orderBy: {
      count: "desc"
    },
    take: 5
  });

  return (
    <div className="w-full p-6 bg-white border-2 border-rose-100 rounded-lg shadow">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 flex items-center justify-between">
        Trending Topics
        <TrendingUp />
      </h5>

      <p className="mb-3 font-normal text-gray-700">The most generated topics from around the world.</p>
      <ul className="space-y-2">
        {topics.map((topic) => (
          <li
            key={ topic.id }
            className="flex flex-wrap items-center text-gray-800 justify-between border-b border-rose-100 pb-3 pt-2"
          >
            <span className="font-medium">{ topic.topic.toUpperCase() }</span>
            <Link
              href={`/tivia/${ topic.topic }`}
              className="flex gap-1 items-center text-rose-400 hover:text-rose-500"
            >
              Generate <ChevronRight />
            </Link>
          </li>
        ))}
      </ul> 
    </div>
  )
}