type Props = {
  question: string;
}

export default function GameQuestion({ question } : Props) {
  return (
    <div className="mt-4 flex gap-2 text-md md:text-lg font-normal text-gray-700">
      { question }
    </div>
  )
}