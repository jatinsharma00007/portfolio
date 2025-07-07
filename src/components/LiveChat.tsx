import { useState, useEffect, useRef } from "react";

type ChatStatus = "pending" | "sent" | "delivered" | "read";

interface Message {
  id: string;
  text: string;
  from: "user" | "me";
  status: ChatStatus;
  timestamp: string;
}

export default function LiveChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMsg: Message = {
      id: crypto.randomUUID(),
      text: input,
      from: "user",
      status: "pending",
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    // Simulate status progression
    setTimeout(() => updateStatus(newMsg.id, "sent"), 500);
    setTimeout(() => updateStatus(newMsg.id, "delivered"), 1500);
    setTimeout(() => updateStatus(newMsg.id, "read"), 3000);
  };

  const updateStatus = (id: string, status: ChatStatus) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, status } : msg))
    );
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="bg-gunmetal-gray p-4 rounded-xl shadow-lg max-w-2xl mx-auto h-[400px] flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-2 pr-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-[70%] px-4 py-2 rounded-lg text-sm ${
              msg.from === "user"
                ? "bg-cool-cyan text-forge-black self-start"
                : "bg-forge-black text-chrome-silver self-end"
            }`}
          >
            <p>{msg.text}</p>
            <div className="text-xs mt-1 flex justify-end items-center gap-1">
              <span>{msg.timestamp}</span>
              {msg.from === "user" && (
                <span>
                  {msg.status === "pending" && "🕒"}
                  {msg.status === "sent" && "✓"}
                  {msg.status === "delivered" && "✓✓"}
                  {msg.status === "read" && "✓✓"}
                  <span className={msg.status === "read" ? "text-molten-orange" : ""}></span>
                </span>
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="flex gap-2 mt-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 py-2 rounded-md bg-forge-black border border-cool-cyan text-chrome-silver"
          placeholder="Type your message..."
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              sendMessage();
            }
          }}
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-cool-cyan text-forge-black rounded-md hover:bg-molten-orange transition"
        >
          Send
        </button>
      </div>
    </div>
  );
} 