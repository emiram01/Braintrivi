import { Brain } from "lucide-react";
import Link from "next/link";

export default function NewGameCard() {
  return (
    <Link href="/trivia" className="w-full p-6 bg-white border-2 border-rose-100 rounded-lg shadow hover:border-rose-500">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 flex items-center justify-between">
        Generate New Trivia
        <Brain />
      </h5>
      <p className="mb-3 font-normal text-gray-700">Found a new topic? Test your knowledge on it by generating a new trivia game!</p>
    </Link>
  )
}