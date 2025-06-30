// src/Login.js
import React, { useState } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth';
import { auth, provider } from './firebase';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = isLogin
        ? await signInWithEmailAndPassword(auth, email, password)
        : await createUserWithEmailAndPassword(auth, email, password);

      setUser(result.user);
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      navigate('/');
    } catch (error) {
      alert('Google Sign-In failed: ' + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>{isLogin ? 'Login to Aptitude Master' : 'Create an Account'}</h2>

        <form onSubmit={handleEmailAuth}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Processing...' : isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <div className="divider">or</div>

        <button className="google-btn" onClick={handleGoogleLogin} disabled={loading}>
          {loading ? 'Signing in...' : 'Continue with Google'}
        </button>

        <p className="switch">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? ' Register' : ' Login'}
          </button>
        </p>
      </div>

      <style>{`
        .auth-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background: linear-gradient(to bottom right, #f0f4ff, #dbe4ff);
        }

        .auth-box {
          background: white;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
          text-align: center;
        }

        .auth-box h2 {
          margin-bottom: 20px;
          font-size: 24px;
          color: #333;
        }

        input {
          width: 100%;
          padding: 12px;
          margin: 10px 0;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 16px;
        }

        button {
          width: 100%;
          padding: 12px;
          font-size: 16px;
          background-color: #3b82f6;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          margin-top: 10px;
          transition: background 0.3s;
        }

        button:hover {
          background-color: #2563eb;
        }

        .google-btn {
          background-color: #ea4335;
          margin-top: 0;
        }

        .google-btn:hover {
          background-color: #d93025;
        }

        .divider {
          margin: 20px 0;
          font-size: 14px;
          color: #888;
        }

        .switch {
          margin-top: 15px;
          font-size: 14px;
          color: #555;
        }

        .switch button {
          background: none;
          border: none;
          color: #3b82f6;
          font-weight: bold;
          margin-left: 5px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Login;