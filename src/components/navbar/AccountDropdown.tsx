import Link from "next/link";
import SignOutButton from "./SignOutButton";

type Props = {
  name: string;
  email: string;
}

export default function AccountDropdown({ name, email }: Props) {
  return (
    <div className="z-10 bg-white divide-y divide-rose-100 rounded-lg shadow shadow-rose-50 border-2 border-rose-100 w-52 text-sm text-gray-700">
    <div className="px-4 py-3">
      {name && <div className="font-medium truncate">{ name }</div>}
      {email && <div className="truncate">{ email }</div>}
    </div>
    <ul className="py-2" aria-labelledby="dropdownInformationButton">
      <li>
        <Link href="/dashboard" className="block px-4 py-2 hover:bg-rose-50">Dashboard</Link>
      </li>
      <li>
        <Link href="/trivia" className="block px-4 py-2 hover:bg-rose-50">Generate New Trivia</Link>
      </li>
      <li>
        <Link href="/trending" className="block px-4 py-2 hover:bg-rose-50">Trending Topics</Link>
      </li>
      <li>
        <Link href="/stats" className="block px-4 py-2 hover:bg-rose-50">My Stats</Link>
      </li>
      <li>
        <Link href="/history" className="block px-4 py-2 hover:bg-rose-50">History</Link>
      </li>
    </ul>
    <div className="py-2">
      <SignOutButton text="Sign Out"/>
    </div>
  </div>
  )
}