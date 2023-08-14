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

type FormData = z.infer<typeof triviaCreationSchema>;

export default function CreateTrivia() {
  const { register, handleSubmit, formState: { errors }, getValues, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(triviaCreationSchema),
    defaultValues: {
      amount: 5,
      topic: "Random",
      type: "multiple_choice",
      difficulty: "medium",
    },
  })

  watch(["type", "difficulty"]);

  const submitData = (input: FormData) => {
    alert(JSON.stringify(input, null, 2))
  }

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white border-2 border-rose-100 rounded-lg shadow shadow-rose-50 m-4">
        <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">Generate New Trivia</h5>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(submitData)}>
          <FormLabel text="Choose a topic"/>
          <input className="border-2 border-rose-100 rounded-md p-2 focus:outline-rose-500" type="text" {...register("topic")} />
          {errors.topic && <FormError text={ errors.topic.message } />}
          
          <FormLabel text="How many questions would you like to generate?"/>
          <input className="border-2 border-rose-100 rounded-md p-2 focus:outline-rose-500" type="number" min={1} max={10} {...register("amount", {valueAsNumber: true})} />
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

          <button className="mt-3 bg-rose-400 text-white font-semibold text-xl p-2 rounded-lg mx-auto w-1/2 hover:bg-rose-500" type="submit">Start</button>
        </form>
      </div>
    </div>
  )
}
