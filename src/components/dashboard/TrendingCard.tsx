import { TrendingUp } from "lucide-react";
import Link from "next/link";

export default function TrendingCard() {
  return (
    <Link href="/trending" className="w-full p-6 bg-white border-2 border-rose-100 rounded-lg shadow hover:border-rose-500">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 flex items-center justify-between">
        Trending Topics
        <TrendingUp />
      </h5>
      <p className="mb-3 font-normal text-gray-700">View today's top generated topics.</p>
    </Link>
  )
}