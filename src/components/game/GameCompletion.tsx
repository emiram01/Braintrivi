import { AlarmClock, BarChart3 } from "lucide-react"
import Link from "next/link"

type Props = {
  gameId: string;
  timeCompleted: string
}

export default function GameCompletion({ gameId, timeCompleted } : Props) {
  return (
    <div className="max-w-2xl mx-auto m-4 md:mt-8 px-4">
      <div className="flex flex-col items-center justify-center w-full p-6 bg-white border-2 border-rose-100 rounded-lg shadow shadow-rose-50">
        <h3 className="text-xl text-gray-900 flex gap-2">
          <AlarmClock />
          Completed in <span className="font-bold">{ timeCompleted }</span>
        </h3>
        <Link
            className="flex gap-2 items-center justify-between mt-5 bg-rose-400 text-white font-semibold text-xl p-4 rounded-lg mx-auto hover:bg-rose-500 disabled:bg-gray-400 disabled:hover:bg-gray-400 w-full sm:w-1/2"
            href={`/results/${gameId}`}
          >
            View Results <BarChart3 />
        </Link>
      </div>
    </div>
  )
}