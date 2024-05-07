import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/");
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (response.status === 201) {
        setMessage('Registration successful');
      } else {
        throw new Error(data.message || 'Registration failed');
      }
    } catch (error) {
      // Assuming the error is due to server being down or unreachable
      localStorage.setItem('user', JSON.stringify({username, password})); // Cache user data locally as fallback
      setMessage('Failed to connect to the server, data cached locally');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
      <button onClick={handleLoginClick}>Login</button>
    </div>
  );
}

export default Register;