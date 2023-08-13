"use client"

import { useForm } from "react-hook-form";
import { triviaCreationSchema } from "@/schemas/triviaCreationSchema"; 
import { zodResolver } from "@hookform/resolvers/zod"; 
import { z } from "zod";

type FormData = z.infer<typeof triviaCreationSchema>;

export default function CreateTrivia() {
  const { register, handleSubmit, formState: { errors }, } = useForm<FormData>({
    resolver: zodResolver(triviaCreationSchema),
    defaultValues: {
      amount: 4,
      topic: "",
      type: "multiple_choice",
    },
  })

  const submitData = (input: FormData) => {
    alert(JSON.stringify(input, null, 2))
  }

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white border-2 border-rose-100 rounded-lg shadow shadow-rose-50 m-4">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Trivia Creation</h5>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit(submitData)}>
          <label className="font-normal text-gray-700">Choose a topic</label>
          <input className="border border-rose-200 rounded-md p-2" type="text" {...register("topic")} />
          {errors.topic && <span className="text-red-500">{ errors.topic.message }</span>}

          <label className="mt-4 font-normal text-gray-700">What type of trivia would you like to create?</label>
          <input type="checkbox" {...register("type")} />
          {errors.type && <span className="text-red-500">{ errors.type.message }</span>}
          
          <label className="mt-4 font-normal text-gray-700">How many questions would you like to generate?</label>
          <input className="border border-rose-200 rounded-md p-2" type="number" min={1} max={10} {...register("amount", {valueAsNumber: true})} />
          {errors.amount && <span className="text-red-500">{ errors.amount.message }</span>}

          <button className="bg-rose-500 text-white p-2 rounded-lg" type="submit">Submit</button>

        </form>
      </div>
    </div>
  )
}
