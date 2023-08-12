"use client"
import { signIn } from "next-auth/react";

type Props = {
  text: string;
}

export default function SignInButton(props: Props) {
  return (
    <button
      onClick={() => { signIn('google').catch(console.error);}}
      className="bg-transparent hover:bg-rose-500 text-rose-500 font-semibold text-sm hover:text-white py-1 px-2 border-2 border-rose-500 hover:border-transparent rounded"
    >
      {props.text}
    </button>
  )
}