import { useState } from "react";
import { api } from "../../lib/api.js";

const SUGGESTIONS = [
  "Examples →",
  "Which suppliers are most urgent right now?",
  "Compare Anand Textiles vs Sharma Exports",
  "Which suppliers will decline in the next 14 days?",
  "Tell me about Delhi Spice Co.",
];

export default function ChatTab() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSend(text) {
    const message = (text ?? input).trim();
    if (!message) return;

    setMessages((prev) => [...prev, { text: message, who: "user" }]);
    setInput("");
    setSending(true);

    try {
      const data = await api.chat(message);
      setMessages((prev) => [...prev, { text: data.reply, who: "bot" }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { text: "Couldn't reach the assistant  " + err.message, who: "bot" },
      ]);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm">
      <h2 className="text-sm font-bold mb-4">
        Risk Assistant <span className="text-xs font-normal text-slate-500"></span>
      </h2>

      <div className="flex gap-2 flex-wrap mb-4">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => handleSend(s)}
            disabled={sending}
            className="bg-slate-50 border border-slate-300 rounded-full px-3 py-1.5 text-xs hover:bg-amber-50 hover:border-amber-400 disabled:opacity-50"
          >
            {s}
          </button>
        ))}
      </div>

      <div className="h-80 overflow-y-auto bg-slate-50 border border-slate-200 rounded p-4 mb-3 flex flex-col gap-2">
        {messages.length === 0 && (
          <div className="h-full flex items-center justify-center text-center text-slate-400 text-sm px-10">
            Ask about any supplier, risk trend, or comparison  or tap a suggestion above.
          </div>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[78%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap ${
              m.who === "user"
                ? "bg-slate-900 text-white ml-auto rounded-br-sm"
                : "bg-white border border-slate-200 rounded-bl-sm"
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask about a supplier or risk trend…"
          className="flex-1 border border-slate-300 rounded px-3 py-2 text-sm"
        />
        <button
          onClick={() => handleSend()}
          disabled={sending}
          className="bg-amber-500 hover:bg-amber-600 px-4 py-2 rounded text-sm font-semibold disabled:opacity-50"
        >
          {sending ? "…" : "Send"}
        </button>
      </div>
    </div>
  );
}