import { History } from "lucide-react";

export default function HistoryCard() {
  return (
    <div className="w-full p-6 bg-white border-2 border-rose-100 rounded-lg shadow">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 flex items-center justify-between">
        History
        <History />
      </h5>
      <p className="mb-3 font-normal text-gray-700">...</p>
    </div>
  )
}