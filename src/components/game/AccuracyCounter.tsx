import { Target } from "lucide-react"

type Props = {
  accuracy: string;
}

export default function AccuracyCounter({ accuracy } : Props) {
  return (
    <div className="flex gap-2 text-md md:text-xl font-semibold text-gray-900">
      <div className="flex gap-2 items-center">
        { accuracy }
      </div>
    </div>
  )
}