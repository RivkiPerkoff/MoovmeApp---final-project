import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../services/axiosInstance';
import { AuthContext } from '../context/AuthContext';
import MessageBanner from '../components/MessageBanner';
import './Login.css';

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (loginUser) {
      navigate('/home', { replace: true });
    }
  }, [loginUser, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', { email, password });
      const user = res.data.user || res.data;
      const token = res.data.token;

      if (token) sessionStorage.setItem('token', token);
      loginUser(user);
      navigate('/home', { replace: true });
    } catch (err) {
      console.error(err);
      setMessage(' פרטי התחברות שגויים');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="login-container">
      <h2>התחברות</h2>
      <MessageBanner message={message} type="error" />
      <form onSubmit={handleLogin} className="login-form">
        <label>דוא"ל:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>סיסמה:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="login-button">התחבר</button>
      </form>
    </div>
  );
};

export default Login;
