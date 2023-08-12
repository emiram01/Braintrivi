import { getAuthSession } from "@/lib/nextauth"
import Link from "next/link";
import SignInButton from "./SignInButton";
import AccountNav from "./AccountNav";

type Props = {}

export default async function Navbar(props: Props) {
  const session = await getAuthSession();
  return (
    <div className='border-b-2 border-rose-100'>
      <nav className='container mx-auto py-2 px-6 flex justify-between items-center'>
        <Link href='/' className='text-lg font-extrabold hover:-translate-y-[2px] border-2 border-b-4 border-rose-500 rounded-lg px-2 bg-rose-50'>
          BR<span className="text-rose-500">AI</span>NTRIVI
        </Link>
        <div>
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