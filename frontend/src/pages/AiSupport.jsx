import { useState, useEffect, useRef } from "react";
import { SendHorizontal } from 'lucide-react';
import "./AiSupport.css";

const AiSupport = () => {
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false); // New loading state
  const scrollRef = useRef(null);

  // Auto-scroll to latest message or loading dots
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, loading]);

  const handleChat = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = { who: "me", message: input };
    setChat((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true); // Start loading

    try {
      const response = await fetch("http://localhost:5000/chatputer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      });
      const data = await response.json();
      setChat((prev) => [...prev, { who: "ai", message: data.reply }]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="aisupport">
      <div className="support-header">
        <h2 className="companysupport">MetaEdge</h2>
        <div className="status-dot"></div>
      </div>

      <div className="chatsection">
        {chat.map((msg, index) => (
          <div key={index} className={`msg-container ${msg.who === "me" ? "me-row" : "ai-row"}`}>
            <p className={msg.who === "me" ? "mestyle" : "aistyle"}>{msg.message}</p>
          </div>
        ))}

        {/* Loading Indicator */}
        {loading && (
          <div className="msg-container ai-row">
            <div className="aistyle loading-dots">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      <form className="askinputdiv" onSubmit={handleChat}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="askinput"
          placeholder={loading ? "MetaEdge is thinking..." : "Type a message..."}
          disabled={loading}
        />
        <button type="submit" className="send-icon" disabled={loading || !input.trim()}>
          <SendHorizontal size={20} strokeWidth={1.5} color={loading ? "#e5e7eb" : "#2563eb"} />
        </button>
      </form>
    </div>
  );
};

export default AiSupport;