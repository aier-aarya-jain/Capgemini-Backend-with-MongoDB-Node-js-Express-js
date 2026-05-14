import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/auth/register', { name, email, password });
      alert('Registration successful! OTP sent to email.');
      setStep(2);
    } catch (err) {
      alert('Registration failed.');
      console.error(err);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/auth/verify-otp', { email, otp });
      alert('OTP Verified! You can now login.');
      window.location.href = '/login';
    } catch (err) {
      alert('Verification failed.');
      console.error(err);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 70px)', background: '#fafafa' }}>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px' }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ width: '100%', maxWidth: '440px', background: '#fff', padding: '48px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
        >
          {step === 1 ? (
            <>
              <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px', letterSpacing: '-1px' }}>Create an account</h2>
                <p style={{ color: '#666' }}>Join us to start shopping premium products.</p>
              </div>
              
              <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#111' }}>Full Name</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="premium-input" 
                    placeholder="John Doe" 
                    required 
                  />
                </div>
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
                <button type="submit" className="premium-btn" style={{ marginTop: '8px', padding: '14px' }}>Create Account</button>
              </form>
            </>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div style={{ marginBottom: '32px' }}>
                <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px', letterSpacing: '-1px' }}>Verify your email</h2>
                <p style={{ color: '#666' }}>We sent a verification code to {email}.</p>
              </div>
              
              <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#111' }}>Verification Code (OTP)</label>
                  <input 
                    type="text" 
                    value={otp}
                    onChange={e => setOtp(e.target.value)}
                    className="premium-input" 
                    placeholder="Enter 6-digit code" 
                    required 
                    style={{ letterSpacing: '4px', textAlign: 'center', fontSize: '20px' }}
                  />
                </div>
                <button type="submit" className="premium-btn" style={{ marginTop: '8px', padding: '14px' }}>Verify Account</button>
              </form>
            </motion.div>
          )}
          
          <div style={{ marginTop: '32px', textAlign: 'center', fontSize: '14px', color: '#666' }}>
            Already have an account? <Link to="/login" style={{ color: '#111', fontWeight: '600', textDecoration: 'none' }}>Log in</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
