import { getAuthSession } from "@/lib/nextauth"
import Link from "next/link";
import SignInButton from "./SignInButton";

type Props = {}

export default async function Navbar(props: Props) {
  const session = await getAuthSession();
  return (
    <div className='bg-gray-300 border-b-2 border-red-600'>
      <nav className='container mx-auto py-4 px-6 flex justify-between items-center'>
        <Link href='/' className='flex items-center text-white text-lg font-extrabold hover:brightness-75'>
          BRAINTRIVI
        </Link>
        <SignInButton text="Sign In" />
      </nav>
    </div>
  )
}