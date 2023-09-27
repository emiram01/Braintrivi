import { Star } from "lucide-react";

type Props = {
  accuracy: number;
}

export function FinalScore({ accuracy }: Props) {
  return (
    <div className="my-10 flex flex-col gap-2 items-center text-3xl md:text-4xl font-bold justify-center">
      {accuracy && (
        <div className="flex gap-2">
          {accuracy >= 80 ? (
            <>
              <Star fill="#facc15" className="w-12 h-12 mt-4 text-yellow-400" />
              <Star fill="#facc15" className="w-16 h-16 text-yellow-400" />
              <Star fill="#facc15" className="w-12 h-12 mt-4 text-yellow-400" />
            </>
          ) : accuracy >= 50 ? (
            <>
              <Star fill="#94a3b8" className="w-12 h-12 text-slate-400" />
              <Star fill="#94a3b8" className="w-12 h-12 text-slate-400" />
            </>
          ) : (
            <Star fill="#cd7f32" className="w-12 h-12 text-[#cd7f32]" />
          )}
        </div>
      )}
      {accuracy} %
    </div>
  )
}