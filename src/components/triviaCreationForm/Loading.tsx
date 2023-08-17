import { Loader2 } from "lucide-react";
import Image from "next/image"
import { useEffect, useState } from "react";

type Props = {
  finishedLoading: boolean;
}

export default function Loading({ finishedLoading }: Props) {
  const [progress, setProgress] = useState<number>(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (finishedLoading) return 100;
        if (prev === 100) {
          return 0;
        }
        if (Math.random() < 0.1) {
          return prev + 2;
        }
        return prev + 0.25;
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, [finishedLoading]);

  return (
    <div className="flex flex-col items-center justify-center px-4 py-10 mx-auto max-w-4xl">
      <div className="flex flex-col items-center w-full justify-center p-6 bg-white border-2 border-rose-100 rounded-lg shadow text-rose-400 font-semibold text-lg md:text-2xl gap-4">
        <Image 
          src={ '/BrainAnim1.gif' }
          alt="Loading"
          width={500}
          height={500}
        />
        <div className="w-full bg-rose-100 rounded-full mt-5">
          <div className="bg-rose-400 h-3 rounded-full" style={{
            width: `${progress}%`
          }}>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <Loader2 className="animate-spin"/> Generating Trivia 
        </div>
      </div>
    </div>
  )
}