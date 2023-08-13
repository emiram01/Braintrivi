import CreateTrivia from "@/components/trivia/CreateTrivia";
import { getAuthSession } from "@/lib/nextauth";
import type { Metadata } from 'next'
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Trivia | Braintrivi"
}

export default async function Trivia() {
  const session = await getAuthSession();
  if (!session?.user) {
    redirect("/");
  }

  return (
    <>
      <CreateTrivia />
    </>
  )
}