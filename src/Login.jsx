import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleDebugClick = () => {
    navigate("/game");
  };

  const handleLogin = async (event) => {
    

    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (response.status === 200) {
        setMessage('Login successful');
      } else {
        setMessage(data.message || 'Login failed');
      }
    } catch (error) {
      setMessage('Failed to connect to the server');
    }
  };

  return (
    <div>
      <h2>Login to Room</h2>
      <form onSubmit={handleLogin}>
        <label>
          Room Name:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
      <button onClick={handleRegisterClick}>Create Room</button>
      <button onClick={handleDebugClick}>Test Game</button>
    </div>
  );
}

export default Login;
