import CreateTrivia from "@/components/triviaCreationForm/CreateTrivia";
import { getAuthSession } from "@/lib/nextauth";
import type { Metadata } from 'next'
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Create New Trivia Game | Braintrivi"
}

type Props = {
  searchParams: {
    topic?: string;
  };
}

export default async function Trivia({ searchParams }: Props) {
  const session = await getAuthSession();
  if (!session?.user) {
    redirect("/");
  }

  return (
      <CreateTrivia topicParam={searchParams.topic ?? ""} />
  )
}