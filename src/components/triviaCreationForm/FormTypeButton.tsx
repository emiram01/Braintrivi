import { ReactNode } from "react";

type Props = {
  text: string;
  icon: ReactNode;
  isSelected: boolean;
  select: () => void;
}

export default function FormTypeButton({ text, icon, isSelected, select }: Props) {
  return (
    <button
      className={`flex items-center gap-4 p-3 rounded-lg border-2 border-rose-100 hover:border-rose-500 ${
      isSelected ? 'bg-rose-100 border-rose-200' : 'bg-white'}`}
      onClick={(e) => {
        e.preventDefault();
        select();
      }}
    >
      { icon } { text }
    </button>
  )
}