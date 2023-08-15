import { Game, Question } from "@prisma/client"
import { Timer } from "lucide-react"
import GameTimer from "./GameTimer"
type Props = {
  game: Game & {questions: Pick<Question, "id" | "options" | "question">[]}
}

export default function MultipleChoice({ game }: Props) {
  return (
    <div>

      <div className="flex items-center justify-between w-1/2">
        <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">{ game.topic.toUpperCase() }</h5>
        <GameTimer />
      </div>

      <div className="max-w-md w-full p-6 bg-white border-2 border-rose-100 rounded-lg shadow shadow-rose-50 m-4 md:mt-8">

      </div>
    </div>
  )
}