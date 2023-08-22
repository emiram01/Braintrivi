import { Brain } from "lucide-react";
import Link from "next/link";

export default function NewGameCard() {
  return (
    <div className="flex flex-col w-full p-6 bg-white border-2 border-rose-100 rounded-lg shadow shadow-rose-50">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 flex items-center justify-between">
        Create New Trivia Game
        <Brain />
      </h5>
      <div className="flex gap-2 items-center justify-center md:gap-4">
        <p className="mb-3 font-normal text-gray-700">Found a new topic? Test your knowledge on it by generating a new trivia game!</p>
      </div>
      <Link 
        href="/trivia"            
        className="mt-3 w-full bg-rose-400 text-white font-semibold text-xl p-2 rounded-lg mx-auto md:w-1/2 hover:bg-rose-500 disabled:bg-gray-400 disabled:hover:bg-gray-400 text-center" 
        >
          Play Now
      </Link>
    </div>
  )
}