import { useState } from "react";
import { SendHorizontal } from 'lucide-react';
import "./AiSupport.css";

const AiSupport = () => {
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");

  const handleChat = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message to UI immediately
    const userMsg = { who: "me", message: input };
    setChat((prev) => [...prev, userMsg]);
    setInput("");

    fetch("http://localhost:5000/chatputer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input })
    })
      .then(res => res.json())
      .then((data) => {
        setChat((prev) => [...prev, { who: "ai", message: data.reply }]);
      });
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
             <p className={msg.who === "me" ? "mestyle" : "aistyle"}>
               {msg.message}
             </p>
          </div>
        ))}
      </div>
      
      <form className="askinputdiv" onSubmit={handleChat}>
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="askinput" 
          placeholder="Type a message..."
        />
        <button type="submit" className="send-icon">
          <SendHorizontal size={20} strokeWidth={1.5} />
        </button>
      </form>
    </div>
  );
}

export default AiSupport;