import React, {  useEffect } from "react";
import { XCircle } from "lucide-react";

type Props = {
  message: string;
  type: "success" | "error" | "neutral";
  onClose: () => void;
};

export default function AnswerCheckPopUp({ message, type, onClose }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`flex w-full bg-white border-2 border-rose-100 shadow shadow-rose-50 mt-4 p-4 rounded-lg ${type === "neutral" ? "text-gray-700" : type === "success" ? "text-lime-500" : "text-red-500"}`}>
      <div className="flex w-full justify-between items-center font-semibold">
        { message }
        <button
        className="hover:text-gray-300"
        onClick={onClose}>
          <XCircle />
        </button>
      </div>
    </div>
  );
};