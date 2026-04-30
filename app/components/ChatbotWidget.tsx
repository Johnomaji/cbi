"use client";

import { FormEvent, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";

type ChatMessage = {
  role: "user" | "bot";
  text: string;
};

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "bot",
      text: "Hi, I am the CBI assistant. Ask me about CBI programs, events, publications, team, and contact details.",
    },
  ]);

  async function submitMessage(event: FormEvent) {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });
      const payload = (await response.json()) as { answer?: string; error?: string };
      const text = payload.answer ?? payload.error ?? "Something went wrong.";
      setMessages((prev) => [...prev, { role: "bot", text }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "I could not connect right now. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6">
      {open ? (
        <div className="w-[calc(100vw-2rem)] max-w-sm rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-700">
            <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">CBI Assistant</h2>
            <button
              onClick={() => setOpen(false)}
              className="rounded-full p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
              aria-label="Close chatbot"
            >
              <X size={16} />
            </button>
          </div>

          <div className="h-80 space-y-3 overflow-y-auto px-4 py-3">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                  message.role === "user"
                    ? "ml-auto bg-cbi-blue text-white"
                    : "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100"
                }`}
              >
                {message.text}
              </div>
            ))}
            {loading && (
              <div className="max-w-[85%] rounded-xl bg-slate-100 px-3 py-2 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                Thinking...
              </div>
            )}
          </div>

          <form onSubmit={submitMessage} className="flex gap-2 border-t border-slate-200 p-3 dark:border-slate-700">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about CBI..."
              className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-cbi-blue dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center rounded-lg bg-cbi-blue px-3 text-white transition hover:bg-cbi-blue-mid disabled:cursor-not-allowed disabled:opacity-60"
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-cbi-blue text-white shadow-lg transition hover:bg-cbi-blue-mid"
          aria-label="Open chatbot"
        >
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  );
}
