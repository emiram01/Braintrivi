import { Circle, CircleDot } from "lucide-react";

type Props = {
  text: string;
  isSelected: boolean;
  select: () => void;
}

export default function GameOptionButton({ text, isSelected, select} : Props) {
  return (
    <button
      className={`flex items-center gap-4 p-3 rounded-lg border-2 border-rose-100 hover:border-rose-500 w-full ${
      isSelected ? 'bg-rose-100 border-rose-200' : 'bg-white'}`}
      onClick={(e) => {
        e.preventDefault();
        select();
      }}
    >
      { isSelected ? <CircleDot /> : <Circle />} { text }
    </button>
  )
}