import keyword_extractor from "keyword-extractor";
import { MoveRight } from "lucide-react";
import { Dispatch, SetStateAction, useMemo } from "react";

type Props = {
  answer: string;
  setBlankAnswer: Dispatch<SetStateAction<string>>;
}

const BLANKS = "_____";

export default function GameTextInput({ answer, setBlankAnswer } : Props) {
  const keywords = useMemo(() => {
    const words = keyword_extractor.extract(answer, {
      language: "english",
      remove_digits: false,
      return_changed_case: false,
      remove_duplicates: false,
    });

    const shuffled = words.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 1);
  }, [answer]);

  const answerWithBlanks = useMemo(() => {
    const answerWithBlanks = keywords.reduce((acc, keyword) => {
      return acc.replace(keyword, BLANKS);
    }, answer)

    setBlankAnswer(answerWithBlanks);
    return answerWithBlanks;
  }, [keywords, answer, setBlankAnswer])

  return (
    <div className="mt-4 flex gap-4 text-md md:text-lg font-normal items-center text-gray-700">
      <MoveRight/>
      <div className="flex flex-wrap gap-2">
        { answerWithBlanks.split(BLANKS).map((part, index) => {
          return (
            <div className="flex items-center gap-2">
              { part }
              { index === answerWithBlanks.split(BLANKS).length - 1 ? null : (
                <input
                  autoComplete="off"
                  id="blank-input"
                  className="text-center border-2 border-rose-100 text-gray-700 font-bold rounded focus:outline-rose-500"
                  >
                </input>
              )}
            </div>
          );
        }) }
      </div>

    </div>
  )
}