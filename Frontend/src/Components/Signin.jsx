import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    setError('');
  
    if (!username || !password) {
      setError('Username and password are required.');
      return;
    }
  
    console.log("🔍 Sending Signin Request:", { username, password }); // ✅ Debug request
  
    try {
      const res = await axios.post('http://localhost:5000/signin', { 
        username, 
        password 
      }, {
        headers: { "Content-Type": "application/json" } // ✅ Ensure JSON format
      });
  
      console.log("✅ Signin Response:", res.data); // ✅ Debug response
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard'); 
    } catch (err) {
      console.error("❌ Signin Error:", err.response?.data || err.message); // ✅ Debug error
      setError(err.response?.data?.message || 'Signin failed');
    }
  };
  

  return (
    <div className="form-container">
      <h2>Signin</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSignin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Signin</button>
      </form>
    </div>
  );
}

export default Signin;
