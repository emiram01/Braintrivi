import CreateTrivia from "@/components/triviaCreationForm/CreateTrivia";
import { getAuthSession } from "@/lib/nextauth";
import type { Metadata } from 'next'
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Create New Trivia | Braintrivi"
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