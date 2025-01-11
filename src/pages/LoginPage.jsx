import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api'; // Import the login function from api.js
import './LoginPage.css'; // Import the external CSS file for styling

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For redirecting to protected page after login

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userData = { username, password };
      const response = await login(userData); // Call login API
      localStorage.setItem('token', response.token); // Save the JWT token in localStorage
      navigate('/'); // Redirect to home page (or protected page) after successful login
    } catch (err) {
      console.log(err);
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-btn">Login</button>
        </form>

        <div className="footer-links">
          <p>
            Don&apos;t have an account? <a href="/register">Register here</a>
          </p>
          <p>
            <a href="/forgot-password">Forgot Password?</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
