import Chat from "./Chat";
import "./index.css"; // Ensure global styles if any

export default function App() {
  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "radial-gradient(circle at 50% -20%, #1a1a2e, #0f0f13 80%)",
      color: "#fff",
      fontFamily: "'Inter', sans-serif"
    }}>
      <Chat />
    </div>
  );
}