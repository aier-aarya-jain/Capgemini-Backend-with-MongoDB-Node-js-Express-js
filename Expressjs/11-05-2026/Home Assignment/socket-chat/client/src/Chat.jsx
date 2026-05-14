import { useEffect, useState, useRef } from "react";
import { socket } from "./socket";
import MessageBubble from "./MessageBubble";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Users, CircleDot } from "lucide-react";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [online, setOnline] = useState(0);
  const [typing, setTyping] = useState("");
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing]);

  useEffect(() => {
    socket.on("chat_message", msg => setMessages(prev => [...prev, msg]));
    socket.on("system_message", msg => setMessages(prev => [...prev, { system: true, text: msg, id: Math.random() }]));
    socket.on("user_count", setOnline);
    socket.on("typing", ({ userId, isTyping }) => setTyping(isTyping ? userId : ""));
  }, []);

  const send = () => {
    if (!text.trim()) return;
    socket.emit("chat_message", { text });
    socket.emit("typing", false);
    setText("");
  };

  const typingHandler = e => {
    setText(e.target.value);
    socket.emit("typing", true);
    setTimeout(() => socket.emit("typing", false), 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={styles.chatBox}
    >
      {/* HEADER */}
      <div style={styles.header}>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }} 
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <CircleDot size={18} color="#10b981" />
          </motion.div>
          <span style={styles.title}>NEXUS CHAT</span>
        </div>
        <div style={styles.onlineBadge}>
          <Users size={14} />
          {online} Online
        </div>
      </div>

      {/* MESSAGES */}
      <div style={styles.messages}>
        <AnimatePresence>
          {messages.map((m, i) =>
            m.system ? (
              <motion.div 
                key={m.id || i} 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={styles.system}
              >
                — {m.text} —
              </motion.div>
            ) : (
              <MessageBubble
                key={i}
                msg={m}
                mine={m.id === socket.id?.slice(0, 6)}
              />
            )
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* TYPING & INPUT */}
      <div style={styles.footer}>
        <div style={styles.typingContainer}>
          <AnimatePresence>
            {typing && (
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                style={styles.typingText}
              >
                {typing} is typing...
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        
        <div style={styles.inputArea}>
          <input
            style={styles.input}
            value={text}
            onChange={typingHandler}
            onKeyDown={e => e.key === "Enter" && send()}
            placeholder="Type your message..."
          />
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: "#4f46e5" }}
            whileTap={{ scale: 0.95 }}
            style={styles.btn} 
            onClick={send}
          >
            <Send size={18} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

const styles = {
  chatBox: {
    width: 440,
    height: 650,
    background: "rgba(26, 26, 36, 0.65)",
    backdropFilter: "blur(12px)",
    borderRadius: 24,
    display: "flex",
    flexDirection: "column",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)"
  },
  header: {
    background: "rgba(18, 18, 28, 0.5)",
    padding: "20px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  title: {
    fontWeight: 700,
    fontSize: 16,
    letterSpacing: 1,
    background: "linear-gradient(90deg, #818cf8, #c084fc)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  },
  onlineBadge: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 12,
    fontWeight: 600,
    background: "rgba(99, 102, 241, 0.15)",
    padding: "6px 12px",
    borderRadius: 20,
    color: "#818cf8",
    border: "1px solid rgba(99, 102, 241, 0.3)"
  },
  messages: {
    flex: 1,
    overflowY: "auto",
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  },
  system: {
    textAlign: "center",
    color: "#6b7280",
    fontSize: 12,
    margin: "8px 0",
    fontWeight: 500
  },
  footer: {
    background: "rgba(18, 18, 28, 0.5)",
    borderTop: "1px solid rgba(255, 255, 255, 0.05)",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    padding: "16px 24px"
  },
  typingContainer: {
    height: 20,
    marginBottom: 8,
  },
  typingText: {
    fontSize: 12,
    color: "#818cf8",
    fontStyle: "italic"
  },
  inputArea: {
    display: "flex",
    gap: 12,
  },
  input: {
    flex: 1,
    background: "rgba(0, 0, 0, 0.2)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    padding: "12px 16px",
    color: "white",
    fontSize: 14,
    outline: "none",
    transition: "border 0.2s"
  },
  btn: {
    background: "#6366f1",
    color: "white",
    border: "none",
    borderRadius: 12,
    width: 46,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)"
  }
};