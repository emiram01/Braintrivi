import { BarChart3, LayoutDashboard, } from "lucide-react"
import Link from "next/link"

type Props = {
  gameId: string;
  totalCorrect: number;
  questionAmount: number;
  timeCompleted: string
}

export default function MCTFGameCompletion({ gameId, totalCorrect, questionAmount, timeCompleted } : Props) {
  return (
    <div className="max-w-2xl mx-auto m-4 md:mt-8 px-4">
      <div className="flex flex-col items-center justify-center w-full p-6 bg-white border-2 border-rose-100 rounded-lg shadow shadow-rose-50">
        <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">{ totalCorrect } / { questionAmount }</h5>
        <h3 className="text-xl text-gray-900">
          Completed in <span className="font-bold">{ timeCompleted }</span>
        </h3>
        <Link
            className="flex gap-2 items-center justify-between mt-5 bg-rose-400 text-white font-semibold text-xl p-4 rounded mx-auto hover:bg-rose-500 disabled:bg-gray-400 disabled:hover:bg-gray-400 w-full sm:w-1/2"
            href={`/results/${gameId}`}
          >
            View Results <BarChart3 />
        </Link>
        <Link
            className="flex gap-2 items-center justify-between mt-5 bg-rose-400 text-white font-semibold text-xl p-4 rounded mx-auto hover:bg-rose-500 disabled:bg-gray-400 disabled:hover:bg-gray-400 w-full sm:w-1/2"
            href={'/dashboard'}
          >
            Go to Dashboard <LayoutDashboard />
        </Link>
      </div>
    </div>
  )
}