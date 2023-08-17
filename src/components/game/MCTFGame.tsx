"use client";

import { Game, Question } from "@prisma/client";
import GameTimer from "./GameTimer";
import QuestionCounter from "./QuestionCounter";
import ScoreCounter from "./ScoreCounter";
import GameQuestion from "./GameQuestion";
import GameOptionButton from "./GameOptionButton";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronRight, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";
import { checkAnswerSchema } from "@/schemas/checkAnswerSchema";
import AnswerCheckPopUp from "./AnswerCheckPopUp";
import GameCompletion from "./GameCompletion";
import { differenceInSeconds } from "date-fns";
import { formatTimeDelta } from "@/lib/utils";

type Props = {
  game: Game & {questions: Pick<Question, "id" | "options" | "question">[]};
}

export default function MCTFGame({ game }: Props) {
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number>(-1);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [wrongAnswers, setWrongAnswers] = useState<number>(0);
  const [hasEnded, setHasEnded] = useState<boolean>(false);
  const [now, setNow] = useState<Date>(new Date);
  const [popUp, setPopUp] = useState<{ message: string; type: "success" | "error" | "neutral" } | null>(null);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (!hasEnded) {
        setNow(new Date());
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    }
  }, [hasEnded]);

  const {mutate: checkAnswer, isLoading: isChecking} = useMutation({
    mutationFn: async () => {
      const payload: z.infer<typeof checkAnswerSchema> = {
        questionId: currentQuestion.id,
        userAnswer: options[selectedOption],
      }
      const response = await axios.post('/api/checkAnswer', payload);
      return response.data;
    }
  });

  const handleNext = useCallback(() => {
    if (isChecking) return;
    checkAnswer(undefined, {
      onSuccess: ({ isCorrect }) => {
        if (isCorrect) {
          setCorrectAnswers(prev => prev + 1);
          setPopUp({ message: "Correct answer!", type: "success" });
        } else {
          setWrongAnswers(prev => prev + 1);
          setPopUp({ message: "Wrong answer!", type: "error" });
        }
        if (questionIndex === game.questions.length - 1) {
          setHasEnded(true);
          return;
        }
        setQuestionIndex(prev => prev + 1);
        setSelectedOption(-1);
      },
    });
  }, [checkAnswer, popUp, isChecking, questionIndex, game.questions.length])

  const currentQuestion = useMemo(() => {
    return game.questions[questionIndex];
  }, [questionIndex, game.questions]);

  const options: string[] = useMemo(() => {
    if (!currentQuestion?.options)
      return [];

    return JSON.parse(currentQuestion.options as string);
  }, [currentQuestion]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") { handleNext(); }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    }
  }, [handleNext]);

  if (hasEnded) {
    return <GameCompletion gameId={ game.id } timeCompleted={formatTimeDelta(differenceInSeconds(now, game.timeStarted))} />
  }

  return (
    <div className="flex flex-col items-center justify-between max-w-2xl w-full mx-auto m-4 md:mt-8 px-4">
      <div className="flex items-center justify-between w-full">
        <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">{ game.topic.toUpperCase() }</h5>
        <GameTimer currTime={formatTimeDelta(differenceInSeconds(now, game.timeStarted))} />
      </div>

      <div className="w-full p-6 bg-white border-2 border-rose-100 rounded-lg shadow shadow-rose-50">
        <div className="flex flex-wrap justify-between">
          <QuestionCounter currQuestion={ questionIndex + 1 } qAmount={ game.questions.length }/>
          <ScoreCounter correct={correctAnswers} wrong={wrongAnswers}/>
        </div>
        <GameQuestion question={ currentQuestion.question }/>
        <div className="flex flex-col mt-4 gap-2">
          { 
            options.map((option, index) => {
              return (
                <GameOptionButton 
                  key={index}
                  text={ option }
                  isSelected={ selectedOption === index }
                  select={ () => setSelectedOption(index) }
                /> 
              )
            })
          }
        </div>
        <button 
            className="flex gap-2 items-center justify-between mt-5 bg-rose-400 text-white font-semibold text-xl p-2 pl-3 rounded-lg mx-auto hover:bg-rose-500 disabled:bg-gray-400 disabled:hover:bg-gray-400" 
            disabled={ selectedOption === -1 || isChecking }
            onClick={() => {
              handleNext();
            }}
          >
            Next Question {isChecking ? <Loader2 className="animate-spin"/> : <ChevronRight />}
        </button>
      </div>
      {popUp && (
        <AnswerCheckPopUp
          message={popUp.message}
          type={popUp.type}
          onClose={() => setPopUp(null)}
        />
      )}

    </div>
  )
}