import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Assuming backend is running on port 3000
      const res = await axios.post('http://localhost:3000/api/auth/login', { email, password });
      alert('Login successful!');
      console.log(res.data);
    } catch (err) {
      alert('Login failed. Please check credentials.');
      console.error(err);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 70px)', background: '#fafafa' }}>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px' }}>
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ width: '100%', maxWidth: '440px', background: '#fff', padding: '48px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
        >
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px', letterSpacing: '-1px' }}>Welcome back</h2>
            <p style={{ color: '#666' }}>Please enter your details to sign in.</p>
          </div>
          
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#111' }}>Email address</label>
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="premium-input" 
                placeholder="Enter your email" 
                required 
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#111' }}>Password</label>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="premium-input" 
                placeholder="••••••••" 
                required 
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" style={{ accentColor: '#111', width: '16px', height: '16px' }} />
                <span style={{ color: '#666' }}>Remember for 30 days</span>
              </label>
              <a href="#" style={{ color: '#111', fontWeight: '500', textDecoration: 'none' }}>Forgot password?</a>
            </div>
            <button type="submit" className="premium-btn" style={{ marginTop: '8px', padding: '14px' }}>Sign In</button>
          </form>
          
          <div style={{ marginTop: '32px', textAlign: 'center', fontSize: '14px', color: '#666' }}>
            Don't have an account? <Link to="/register" style={{ color: '#111', fontWeight: '600', textDecoration: 'none' }}>Sign up</Link>
          </div>
        </motion.div>
      </div>
      
      <div style={{ flex: 1, display: 'none', '@media(minWidth: 900px)': { display: 'block' }, position: 'relative' }}>
        <img 
          src="https://images.unsplash.com/photo-1618220179428-22790b46a0eb?w=1200&q=80" 
          alt="Login banner" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.4), rgba(0,0,0,0.1))' }} />
      </div>
    </div>
  );
}
