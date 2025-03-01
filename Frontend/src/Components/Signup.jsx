import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    setMessage('');
    setError('');
  
    if (!username || !password) {
      setError('Username and password are required.');
      return;
    }
  
    console.log("Sending Signup Request:", { username, password }); // ✅ Debugging
  
    try {
      const response = await axios.post('http://localhost:5000/signup', { 
        username, 
        password 
      });
  
      console.log("Signup Response:", response.data); // ✅ Debugging
      setMessage('Signup successful! Please log in.');
    } catch (err) {
      console.error("Signup Error:", err.response?.data || err.message); // ✅ Debugging
      setError(err.response?.data?.message || 'Signup failed');
    }
  };
  

  return (
    <div className='auth-container'>
      <h1>Sign Up</h1>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSignup}>
        <label htmlFor="username">Username:</label>
        <input 
          type="text" 
          id="username" 
          className="input-field" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input 
          type="password" 
          id="password" 
          className="input-field" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className='auth-btn'>Sign Up</button> 
      </form>
    </div>
  );
}

export default Signup;
