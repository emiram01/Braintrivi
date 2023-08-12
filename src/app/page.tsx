import SignInButton from "@/components/SignInButton";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getAuthSession();
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white border-2 border-rose-100 rounded-lg shadow m-4">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">🧠 Welcome to BR<span className="text-rose-500">AI</span>NTRIVI!</h5>
        <p className="mb-3 font-normal text-gray-700"> Ready to test your knowledge? Challenge yourself with AI-generated trivia questions on any topic you can think of. Put your brain to the test and start playing today!</p>
        <SignInButton text="Sign In with Google" />
      </div>
    </div>
  )
}
