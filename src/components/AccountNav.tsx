"use client"

import { useState, useEffect, useRef } from "react"; 
import { User } from "next-auth";
import Image from "next/image";
import AccountDropdown from "./AccountDropdown";

type Props = {
  user: Pick<User, "name" | "image" | "email">;
}

export default function AccountNav({ user }: Props) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropDownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropDown = () => {
    setShowDropdown(!showDropdown);
  }

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target as Node))
        setShowDropdown(false);
    }

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <div className="relative" ref={dropDownRef}>
      <button
      onClick={ toggleDropDown }
      className="relative w-8 aspect-square"
      > 
        {user.image && 
        <Image fill src={ user.image } alt="User profile image" referrerPolicy="no-referrer" 
        className={`rounded-full border-2 border-rose-100 hover:border-rose-500 ${showDropdown && "border-rose-500"}`}/>}
      </button>
      
      {showDropdown && user.name && user.email && (
        <div className="absolute top-full mt-2 right-0">
          <AccountDropdown name={user.name} email={user.email} />
        </div>
      )}
    </div>
  )
}