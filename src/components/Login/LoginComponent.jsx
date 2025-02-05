import React, { useState } from 'react';
import { login, logout, getToken, isAuthenticated } from '../../services/apiService';


const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    const result = await login(username, password);

    if (result.success) {
      setMessage('Login successful!');
    } else {
      setError(result.message || 'Login failed.');
    }
  };

  const handleLogout = () => {
    logout();
    setMessage('Logged out successfully');
  };

  return (
    <div>
      {!isAuthenticated() ? (
        <div>
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
          {<p style={{ color: 'red' }}>{error}</p>}
          {message && <p>{message}</p>}
        </div>
      ) : (
        <div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default LoginComponent;
