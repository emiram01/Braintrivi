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
    <div className={`flex w-full mt-4 p-4 rounded-lg ${type === "neutral" ? "bg-rose-300" : type === "success" ? "bg-lime-500" : "bg-red-500"}`}>
      <div className="flex w-full justify-between items-center font-semibold text-white">
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