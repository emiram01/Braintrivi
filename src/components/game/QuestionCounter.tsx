import { List } from "lucide-react"

type Props = {
  currQuestion: number;
  qAmount: number;
}

export default function QuestionCounter({ currQuestion, qAmount } : Props) {
  return (
    <div className="flex gap-2 items-center text-md md:text-xl font-semibold text-gray-900">
      <List />{ currQuestion } out of { qAmount }
    </div>
  )
}