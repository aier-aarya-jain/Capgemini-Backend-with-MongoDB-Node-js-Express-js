import { motion } from "framer-motion";

export default function MessageBubble({ msg, mine }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: mine ? "flex-end" : "flex-start",
      }}
    >
      <div style={{
        background: mine ? "linear-gradient(135deg, #6366f1, #4f46e5)" : "rgba(37, 37, 53, 0.8)",
        color: "white",
        padding: "12px 16px",
        borderRadius: mine
          ? "16px 16px 4px 16px"
          : "16px 16px 16px 4px",
        maxWidth: "75%",
        boxShadow: mine ? "0 4px 12px rgba(99, 102, 241, 0.3)" : "0 4px 12px rgba(0, 0, 0, 0.1)",
        border: mine ? "none" : "1px solid rgba(255, 255, 255, 0.05)",
        fontSize: 14,
        lineHeight: 1.5,
        wordBreak: "break-word"
      }}>
        {msg.text}
      </div>

      <small style={{
        color: "#6b7280",
        fontSize: 11,
        marginTop: 6,
        padding: "0 4px"
      }}>
        {msg.id} · {msg.timestamp || new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
      </small>
    </motion.div>
  );
}