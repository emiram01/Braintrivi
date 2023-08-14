import SignInButton from "@/components/navbar/SignInButton";
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
        <p className="text-lg md:text-2xl font-bold tracking-tighter text-gray-900 text-center italic">Welcome to</p>
        <h5 className="mb-4 text-center text-5xl md:text-7xl font-extrabold tracking-tighter text-gray-900">BR<span className="text-rose-500">AI</span>NTRIVI!</h5>
        <h3 className="mb-6 text-xl md:text-3xl font-medium text-gray-700 text-center md:mx-16">Want to test your knowledge? Challenge yourself with AI-generated trivia games on any topic you can think of. Put your brain to the test and start playing for free today!</h3>

        <div className="max-w-2xl w-full p-6 backdrop-blur border-2 border-rose-100 rounded-lg shadow mx-auto flex items-center gap-6 justify-center">
          <div className="hidden sm:block text-8xl text-center">🧠</div>
          <div>
            <h1 className="text-2xl md:text-4xl font-bold mb-3">Get Started</h1>
            <p className="mb-4 text-base md:text-lg text-gray-700">Ready to become a trivia master? Sign in with your Google account to start playing!</p>
            <SignInButton text="Sign In with Google" />
          </div>
        </div>
      </div>
    </div>
  )
}
