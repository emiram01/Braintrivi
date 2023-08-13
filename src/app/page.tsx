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
      <div className="max-w-7xl w-full p-6 rounded-lg">
        <h5 className="mb-4 text-4xl md:text-7xl font-extrabold tracking-tight text-gray-900">🧠 Welcome to BR<span className="text-rose-500">AI</span>NTRIVI!</h5>
        <div className="max-w-md w-full p-6 bg-white border-2 border-rose-100 rounded-lg shadow">
          <h2 className="text-xl md:text-3xl font-bold mb-3">
            Get Started
          </h2>
          <p className="mb-4 text-base md:text-lg text-gray-700"> Ready to test your knowledge? Challenge yourself with AI-generated trivia questions on any topic you can think of. Put your brain to the test and start playing today!</p>
          <SignInButton text="Sign In with Google" />
        </div>
      </div>
    </div>
  )
}
