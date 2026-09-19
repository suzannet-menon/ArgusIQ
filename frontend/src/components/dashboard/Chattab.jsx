import { useState, useEffect, useRef } from "react";
import { api } from "../../lib/api.js";

const SUGGESTIONS = [
  "Which suppliers are most urgent right now?",
  "Compare Anand Textiles vs Sharma Exports",
  "Which suppliers will decline in the next 14 days?",
  "Tell me about Delhi Spice Co.",
];

const CONVERSATIONS_KEY = "argusiq_conversations";
const ACTIVE_KEY = "argusiq_active_conversation_id";

function makeId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function makeTitle(text) {
  const t = text.trim().slice(0, 36);
  return t.length < text.trim().length ? t + "…" : t;
}

export default function ChatTab() {
  const [conversations, setConversations] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [contextMenu, setContextMenu] = useState(null);
  const bottomRef = useRef(null);

  // Load conversations on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(CONVERSATIONS_KEY);
      const aid = localStorage.getItem(ACTIVE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setConversations(parsed);
          if (aid && parsed.find((c) => c.id === aid)) {
            setActiveId(aid);
          } else {
            setActiveId(parsed[0].id);
          }
          return;
        }
      }
      // Migration: old single-array key
      const old = localStorage.getItem("argusiq_chat_messages");
      if (old) {
        const msgs = JSON.parse(old);
        if (Array.isArray(msgs) && msgs.length > 0) {
          const conv = {
            id: makeId(),
            title: makeTitle(msgs.find((m) => m.who === "user")?.text || "Imported chat"),
            createdAt: new Date().toISOString(),
            messages: msgs,
          };
          setConversations([conv]);
          setActiveId(conv.id);
          localStorage.removeItem("argusiq_chat_messages");
          return;
        }
      }
    } catch {}

    // Fallback: try backend history (local dev file persistence)
    api
      .chatHistory()
      .then((data) => {
        if (data.history && data.history.length > 0) {
          const msgs = data.history.map((h) => ({
            text: h.text,
            who: h.role === "user" ? "user" : "bot",
          }));
          const conv = {
            id: makeId(),
            title: makeTitle(msgs.find((m) => m.who === "user")?.text || "Previous chat"),
            createdAt: new Date().toISOString(),
            messages: msgs,
          };
          setConversations([conv]);
          setActiveId(conv.id);
        } else {
          // start with one empty conversation
          const id = makeId();
          setConversations([{ id, title: "New Chat", createdAt: new Date().toISOString(), messages: [] }]);
          setActiveId(id);
        }
      })
      .catch(() => {
        const id = makeId();
        setConversations([{ id, title: "New Chat", createdAt: new Date().toISOString(), messages: [] }]);
        setActiveId(id);
      });
  }, []);

  // Persist conversations + activeId
  useEffect(() => {
    if (conversations.length === 0) return;
    try {
      localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(conversations));
      if (activeId) localStorage.setItem(ACTIVE_KEY, activeId);
    } catch {}
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversations, activeId]);

  // Close context menu on click / scroll / Esc
  useEffect(() => {
    if (!contextMenu) return;
    const close = () => setContextMenu(null);
    const onKey = (e) => { if (e.key === "Escape") close(); };
    window.addEventListener("click", close);
    window.addEventListener("scroll", close, true);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("click", close);
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("keydown", onKey);
    };
  }, [contextMenu]);

  const activeConv = conversations.find((c) => c.id === activeId) || null;
  const messages = activeConv?.messages || [];

  function updateActiveMessages(updater) {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== activeId) return c;
        const nextMessages = typeof updater === "function" ? updater(c.messages) : updater;
        // auto-title on first user message if still "New Chat"
        let title = c.title;
        if (title === "New Chat") {
          const firstUser = nextMessages.find((m) => m.who === "user");
          if (firstUser) title = makeTitle(firstUser.text);
        }
        return { ...c, messages: nextMessages, title };
      })
    );
  }

  async function handleSend(text) {
    const message = (text ?? input).trim();
    if (!message) return;

    // ensure we have an active conversation
    if (!activeId) {
      const id = makeId();
      const conv = { id, title: makeTitle(message), createdAt: new Date().toISOString(), messages: [] };
      setConversations((prev) => [conv, ...prev]);
      setActiveId(id);
      // delay to let state settle, then add message
      setTimeout(() => handleSend(message), 0);
      return;
    }

    updateActiveMessages((prev) => [...prev, { text: message, who: "user" }]);
    setInput("");
    setSending(true);

    try {
      const data = await api.chat(message);
      updateActiveMessages((prev) => [...prev, { text: data.reply, who: "bot" }]);
    } catch (err) {
      updateActiveMessages((prev) => [
        ...prev,
        { text: "Couldn't reach the assistant  " + err.message, who: "bot" },
      ]);
    } finally {
      setSending(false);
    }
  }

  function handleNewChat() {
    const id = makeId();
    const conv = { id, title: "New Chat", createdAt: new Date().toISOString(), messages: [] };
    setConversations((prev) => [conv, ...prev]);
    setActiveId(id);
    // keep old chats — do NOT delete history, just switch to new
  }

  function handleSelectChat(id) {
    setActiveId(id);
  }

  function handleDeleteChat(id) {
    setContextMenu(null);
    setConversations((prev) => {
      const next = prev.filter((c) => c.id !== id);
      if (next.length === 0) {
        const nid = makeId();
        const nc = { id: nid, title: "New Chat", createdAt: new Date().toISOString(), messages: [] };
        setTimeout(() => setActiveId(nid), 0);
        return [nc];
      }
      if (id === activeId) {
        const idx = prev.findIndex((c) => c.id === id);
        const fallback = next[Math.max(0, idx - 1)] || next[0];
        setTimeout(() => setActiveId(fallback.id), 0);
      }
      return next;
    });
  }

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm flex min-h-[calc(100vh-7rem)] flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold">Risk Assistant</h2>
        <button
          onClick={handleNewChat}
          className="rounded-full bg-slate-900 px-4 py-2 text-xs font-bold text-white shadow hover:bg-amber-500 hover:text-slate-900 transition border border-slate-900 hover:border-amber-500"
        >
          + New Chat
        </button>
      </div>

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

      {/* Recent chats — file-tree style, smaller, indented under Assistant */}
      {conversations.length > 0 && (
        <div className="mb-3 ml-1 border-l-2 border-slate-200 pl-3">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Recent chats</p>
          <div className="max-h-28 overflow-y-auto flex flex-col">
            {conversations.map((c) => (
              <button
                key={c.id}
                onClick={() => handleSelectChat(c.id)}
                onContextMenu={(e) => {
                  e.preventDefault();
                  setContextMenu({ x: e.clientX, y: e.clientY, id: c.id });
                }}
                className={`group relative flex items-center gap-1.5 text-left py-1 pl-3 pr-2 text-[11px] leading-tight truncate border-l-2 -ml-[2px] ${
                  c.id === activeId
                    ? "border-amber-500 bg-amber-50 text-slate-900 font-semibold"
                    : "border-transparent text-slate-500 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700"
                }`}
                title={`${c.title} — right-click to delete`}
              >
                <span className="shrink-0 text-[10px] leading-none opacity-60 group-hover:opacity-100">└</span>
                <span className="truncate font-mono tracking-tight">{c.title}</span>
                <span className="ml-auto shrink-0 pl-2 text-[10px] font-mono tabular-nums opacity-50">{c.messages.length > 0 ? `${c.messages.length}` : "·"}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="min-h-[24rem] flex-1 overflow-y-auto bg-slate-50 border border-slate-200 rounded p-4 mb-3 flex flex-col gap-2">
        {messages.length === 0 && (
          <div className="h-full flex items-center justify-center text-center text-slate-400 text-sm px-10">
            Ask about any supplier, risk trend, or comparison or tap a suggestion above.
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
        <div ref={bottomRef} />
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
      {conversations.length > 0 && (
        <p className="mt-2 text-[11px] text-slate-400 text-center">
          Chats are saved in this browser. Right-click a chat to delete.
        </p>
      )}

      {/* Right-click context menu */}
      {contextMenu && (
        <div
          className="fixed z-50 min-w-[140px] rounded-md border border-slate-200 bg-white py-1 shadow-lg"
          style={{ left: contextMenu.x, top: contextMenu.y }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => handleDeleteChat(contextMenu.id)}
            className="flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs font-semibold text-red-600 hover:bg-red-50"
          >
            🗑 Delete chat
          </button>
        </div>
      )}
    </div>
  );
}
