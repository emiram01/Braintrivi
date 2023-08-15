import { getAuthSession } from "@/lib/nextauth"
import Link from "next/link";
import SignInButton from "./SignInButton";
import AccountNav from "./AccountNav";
import { Info } from "lucide-react";

type Props = {}

export default async function Navbar(props: Props) {
  const session = await getAuthSession();
  return (
    <div className="border-b-2 border-rose-100 z-10 bg-[#fffafa]">
      <nav className="container mx-auto py-2 px-4 flex justify-between items-center max-w-7xl">
        <Link href='/' className="text-2xl font-black hover:bg-rose-100 border-2 border-b-4 border-rose-500 rounded-lg px-2 bg-rose-50">
          BR<span className="text-rose-500">AI</span>NTRIVI
        </Link>
        <div className="flex items-center gap-2">
          {/* <Link href='/info' className="items-center flex gap-2 text-lg font-semibold hover:bg-rose-100 rounded-lg px-2 bg-rose-50">
            <Info />Info
          </Link> */}
          {session?.user ? (
            <AccountNav user={session.user}/>
          ) : (
            <SignInButton text="Sign In" />
          )}
        </div>
      </nav>
    </div>
  )
}