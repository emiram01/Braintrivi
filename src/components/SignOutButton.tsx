"use client"
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

type Props = {
  text: string;
}

export default function SignOutButton(props: Props) {
  return (
    <a
      href="/"
      onClick={(e) => { 
        e.preventDefault();
        signOut().catch(console.error);
      }}
      className="flex items-center px-4 py-2 text-sm text-red-500 hover:bg-rose-50"
    >
      {props.text}
      <LogOut className="w-4 h-4 ml-2"/>
    </a>
  )
}