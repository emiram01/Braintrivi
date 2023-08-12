import SignOutButton from "./SignOutButton";

type Props = {
  name: string;
  email: string;
}

export default function AccountDropdown({ name, email }: Props) {
  return (
    <div className="z-10 bg-white divide-y divide-rose-100 rounded-lg shadow border-2 border-rose-100 w-52 text-sm text-gray-700">
    <div className="px-4 py-3">
      {name && <div className="font-medium truncate">{ name }</div>}
      {email && <div className="truncate">{ email }</div>}
    </div>
    <ul className="py-2" aria-labelledby="dropdownInformationButton">
      <li>
        <a href="/" className="block px-4 py-2 hover:bg-rose-50">Dashboard</a>
      </li>
      <li>
        <a href="/" className="block px-4 py-2 hover:bg-rose-50">Trending Topics</a>
      </li>
      <li>
        <a href="/" className="block px-4 py-2 hover:bg-rose-50">History</a>
      </li>
      <li>
        <a href="/" className="block px-4 py-2 hover:bg-rose-50">Settings</a>
      </li>
    </ul>
    <div className="py-2">
      <SignOutButton text="Sign Out"/>
    </div>
  </div>
  )
}