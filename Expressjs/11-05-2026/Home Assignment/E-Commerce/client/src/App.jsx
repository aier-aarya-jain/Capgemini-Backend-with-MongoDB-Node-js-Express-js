import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { ShoppingBag, User } from 'lucide-react';
import './index.css';

function Navbar() {
  return (
    <nav style={{
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(10px)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      borderBottom: '1px solid #f0f0f0'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '70px'
      }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#111', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShoppingBag size={24} />
          <span style={{ fontSize: '20px', fontWeight: '700', letterSpacing: '-0.5px' }}>E-COMMERCE</span>
        </Link>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Link to="/login" style={{ textDecoration: 'none', color: '#666', fontWeight: 500, transition: 'color 0.2s' }}>Log In</Link>
          <Link to="/register" style={{ textDecoration: 'none' }}>
            <button className="premium-btn" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <User size={16} /> Sign Up
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
