import { CopyCheck, GaugeCircle, HelpCircle, PencilLine } from "lucide-react"
import { FinalScore } from "./FinalScore";
import { CorrectResults } from "./CorrectResults";
import { Question } from "@prisma/client";

type Props = {
  topic: string;
  difficulty: string;
  type: string;
  accuracy: number;
  questions: Question[];
}

export default  function ScoreCard({ topic, difficulty, type, accuracy, questions }: Props) {
  return (
    <div className="w-full p-6 bg-white border-2 border-rose-100 rounded-lg shadow shadow-rose-50">
      <h5 className="flex flex-wrap text-2xl md:text-3xl font-bold tracking-tight text-gray-900 items-center justify-between gap-2">
        { topic }
        <div className="flex flex-wrap gap-2 font-medium text-base text-gray-700">
          <span className={`p-2 px-3 border-2 rounded flex gap-2 ${difficulty && difficulty === "easy" ? "border-lime-500 text-lime-500" : difficulty === "medium" ? "border-orange-400 text-orange-400" : "border-red-500 text-red-500"}`}>
            <GaugeCircle />{ difficulty[0] && difficulty[0].toUpperCase() + difficulty.slice(1)  }
          </span>
          <span className="flex gap-2 px-3 text-black p-2 border-2 border-black rounded">
            { type === "Multiple Choice" ? <CopyCheck /> : type === "Fill in the Blank" ? <PencilLine /> : <HelpCircle /> }
            { type }
          </span>
        </div>
      </h5>

      <FinalScore accuracy={ accuracy } />
      <CorrectResults questions={ questions }/>
    </div>
  )
}