"use client"

import { useForm } from "react-hook-form";
import { triviaCreationSchema } from "@/schemas/triviaCreationSchema"; 
import { zodResolver } from "@hookform/resolvers/zod"; 
import { z } from "zod";
import { CopyCheck, HelpCircle, PencilLine, GaugeCircle } from "lucide-react";
import FormLabel from "./FormLabel";
import FormError from "./FormError";
import FormTypeButton from "./FormTypeButton";
import FormDifficultyButton from "./FormDifficultyButton";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Loading from "./Loading";

type TriviaFormData = z.infer<typeof triviaCreationSchema>;

type Props = {
  topicParam: string;
}

export default function CreateTrivia({ topicParam }: Props) {
  const [showLoader, setShowLoader]= useState<boolean>(false);
  const [finished, setFinished]= useState<boolean>(false);
  const router = useRouter();
  const { mutate: getQuestions, isLoading } = useMutation({
    mutationFn: async ({ amount, topic, type, difficulty }: TriviaFormData) => {
      const response = await axios.post('/api/game', {
        amount, topic, type, difficulty,
      });
      return response.data;
    }
  })

  const { register, handleSubmit, formState: { errors }, getValues, setValue, watch } = useForm<TriviaFormData>({
    resolver: zodResolver(triviaCreationSchema),
    defaultValues: {
      amount: undefined,
      topic: topicParam,
      type: "multiple_choice",
      difficulty: "easy",
    },
  })

  watch(["type", "difficulty"]);

  const submitData = (input: TriviaFormData) => {
    setShowLoader(true);
    getQuestions({
      amount: input.amount,
      topic: input.topic,
      type: input.type,
      difficulty: input.difficulty,
    }, {
      onSuccess: ({ gameId }) => {
        setFinished(true);
        setTimeout(() => {
          if (getValues("type") === "multiple_choice") {
            router.push(`/play/multiple-choice/${ gameId }`);
          } else if (getValues("type") === "fill_in") {
            router.push(`/play/fill-in/${ gameId }`);
          } else if (getValues("type") === "true_or_false") {
            router.push(`/play/true-or-false/${ gameId }`);
          }
        }, 1000);
      },
      onError: () => {
        setShowLoader(false);
      }
    })
  }

  if (showLoader) {
    return <Loading finishedLoading={ finished }/>
  }

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white border-2 border-rose-100 rounded-lg shadow shadow-rose-50 m-4 md:mt-8">
        <h5 className="mb-2 text-2xl md:text-3xl font-bold tracking-tight text-gray-900">Create New Trivia Game</h5>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(submitData)}>
          <FormLabel text="Choose a topic"/>
          <input 
            autoComplete="off"
            className="border-2 border-rose-100 rounded-md p-2 focus:outline-rose-500" type="text" {...register("topic")} />
          {errors.topic && <FormError text={ errors.topic.message } />}
          
          <FormLabel text="How many questions would you like to generate?"/>
          <input className="border-2 border-rose-100 rounded-md p-2 focus:outline-rose-500" type="number" min={1} max={4} {...register("amount", {valueAsNumber: true})} />
          {errors.amount && <FormError text={ errors.amount.message } />}

          <FormLabel text="What type of trivia would you like to play?"/>
          <div className="flex flex-col gap-2">
            <FormTypeButton 
              text="Multiple Choice"
              icon={ <CopyCheck /> }
              isSelected={ getValues("type") === "multiple_choice" }
              select={ () => setValue("type", "multiple_choice") }
            />
            <FormTypeButton 
              text="Fill in the Blank"
              icon={ <PencilLine /> }
              isSelected={ getValues("type") === "fill_in" }
              select = { () => setValue("type", "fill_in") }
            />
            <FormTypeButton 
              text="True or False"
              icon={ <HelpCircle /> }
              isSelected={ getValues("type") === "true_or_false" }
              select = { () => setValue("type", "true_or_false") }
            />
          </div>
          {errors.type && <FormError text={ errors.type.message } />}

          <FormLabel text="Choose difficulty"/>
          <div className="flex flex-col gap-2 md:flex-row">
            <FormDifficultyButton 
              text="Easy"
              icon={ <GaugeCircle color="#84cc16" /> }
              isSelected={ getValues("difficulty") === "easy" }
              select={ () => setValue("difficulty", "easy") }
            />
            <FormDifficultyButton 
              text="Medium"
              icon={ <GaugeCircle color="#fb923c" /> }
              isSelected={ getValues("difficulty") === "medium" }
              select={ () => setValue("difficulty", "medium") }
            />
            <FormDifficultyButton 
              text="Hard"
              icon={ <GaugeCircle color="#ef4444" /> }
              isSelected={ getValues("difficulty") === "hard" }
              select={ () => setValue("difficulty", "hard") }
            />
          </div>
          {errors.difficulty && <FormError text={ errors.difficulty.message } />}

          <button 
            className="mt-3 bg-rose-400 text-white font-semibold text-xl p-2 rounded-lg mx-auto w-1/2 hover:bg-rose-500 disabled:bg-rose-200 disabled:hover:bg-rose-200" 
            type="submit"
            disabled={isLoading}
          >
            Start
          </button>
        </form>
      </div>
    </div>
  )
}
