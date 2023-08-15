import { AlarmClock } from "lucide-react";

type Props = {
  currTime: string
}

export default function GameTimer({ currTime } : Props) {
  return (
    <div className="flex items-center justify-center gap-2 text-gray-900">
      <AlarmClock /><span className="font-semibold">{ currTime }</span>
    </div>
  )
}