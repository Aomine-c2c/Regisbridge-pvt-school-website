import { MessageSquare } from "lucide-react";

export default function CommunicationsPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-slate-400">
      <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4">
        <MessageSquare className="w-8 h-8 text-slate-500" />
      </div>
      <h3 className="text-lg font-semibold text-slate-700">Your Messages</h3>
      <p className="text-sm">Select a conversation to start chatting</p>
    </div>
  );
}
