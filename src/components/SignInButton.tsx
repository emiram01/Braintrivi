"use client"
import { signIn } from "next-auth/react";

type Props = {
  text: string;
}

export default async function SignInButton(props: Props) {
  return (
    <button
      onClick={() => { signIn('google').catch(console.error);}}
    >
      {props.text}
    </button>
  )
}