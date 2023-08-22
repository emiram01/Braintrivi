import { Question } from "@prisma/client";

type Props = {
  questions: Question[];
}

export function CorrectResults({ questions }: Props) {
  let gameType = questions[0].questionType;

  return (
    <div className="relative overflow-x-auto rounded-lg">
      <table className="w-full text-left text-lg text-gray-600 border-x-2 border-rose-50">
        <thead className="text-lg text-gray-700 uppercase bg-rose-50 rounded-lg">
          <tr>
            <th scope="col" className="px-6 py-3">
              No.
            </th>
            <th scope="col" className="px-6 py-3">
              Question
            </th>
            <th scope="col" className="px-6 py-3">
              Your Answer
            </th>
            <th scope="col" className="px-6 py-3">
              Correct Answer
            </th>
          </tr>
        </thead>
        <tbody>
          <>
            { questions.map((question, index) => {
              return (
                <tr key={index} className="bg-white border-b border-rose-50">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-700 whitespace-nowrap">
                    { index + 1 }
                  </th>
                  <td className="px-6 py-4">
                    { question.question }
                  </td>
                  <td className={`px-6 py-4 ${ (gameType === "multiple_choice" || gameType === "true_or_false") ? (question.isCorrect ? "text-lime-500" : "text-red-500" ) : "text-gray-400" }`}>
                    { question.userAnswer }
                  </td>
                  <td className="px-6 py-4">
                    { question.answer }
                  </td>
                </tr>
              )
            })}
          </>
        </tbody>
      </table>
    </div>
  )
}