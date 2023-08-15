import { XCircle, CheckCircle2 } from "lucide-react"

type Props = {
  correct: number;
  wrong: number;
}

export default function ScoreCounter({ correct, wrong } : Props) {
  return (
    <div className="flex gap-2 text-md md:text-xl font-semibold text-gray-900">
      <div className="flex gap-2 items-center text-red-500">
        <XCircle />{ wrong }
      </div>
      :
      <div className="flex gap-2 items-center text-lime-500">
        <CheckCircle2 />{ correct }
      </div>
    </div>
  )
}