import SignInButton from "@/components/navbar/SignInButton";
import { getAuthSession } from "@/lib/nextauth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getAuthSession();
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-4xl w-full p-6 rounded-lg">        
        <div className="w-full p-6 bg-white border-2 border-rose-100 rounded-lg shadow mx-auto flex flex-col items-center gap-3 justify-center">
          <div className="flex flex-wrap gap-x-4 items-baseline justify-center">
            <p className="text-lg md:text-2xl font-bold tracking-tighter text-gray-900 text-center italic">Welcome to</p>
            <h5 className="text-center text-5xl md:text-7xl font-extrabold tracking-tighter text-gray-900">BR<span className="text-rose-500">AI</span>NTRIVI!</h5>
          </div>
          <h3 className="text-base md:text-lg text-gray-700 text-center">Want to test your knowledge? Challenge yourself with AI-generated trivia games on any topic you can think of. Put your brain to the test and start playing for free today!</h3>
          <div className="w-full mx-auto sm:flex items-center justify-center">
            <Image 
              src={ '/brainAnim3.gif' }
              alt="sign in image"
              width={500}
              height={500}
            />
            <div>
              <h1 className="text-2xl md:text-4xl font-bold mb-1">Get Started</h1>
              <p className="mb-4 text-base md:text-lg text-gray-700">Ready to become a trivia master? Sign in with your Google account to start playing!</p>
              <SignInButton text="Sign In with Google" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
