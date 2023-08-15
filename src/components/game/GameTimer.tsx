import { AlarmClock } from "lucide-react"

type Props = {

}

export default function GameTimer(props : Props) {
  return (
    <div className="flex items-center justify-center gap-2">
      <AlarmClock /><span className="font-bold">00:00</span>
    </div>
  )
}