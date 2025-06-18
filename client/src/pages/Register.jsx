import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../services/axiosInstance';
import { AuthContext } from '../context/AuthContext';
import MessageBanner from '../components/MessageBanner';
import './Register.css';

const Register = () => {
  const { loginUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      user_type: 'user'
    };
    try {
      const res = await axios.post('/auth/register', dataToSend);
      const user = res.data.user || res.data;
      const token = res.data.token;
      if (token) localStorage.setItem('token', token);
      loginUser(user);
      navigate('/home', { replace: true });
    } catch (err) {
      console.error("❌ שגיאת שרת:", err.response?.data);
      if (err.response?.data?.errors) {
        const errorMessages = err.response.data.errors.map(e => `• ${e.msg}`).join('\n');
        setMessage(`❌ שגיאות בטופס:\n${errorMessages}`);
      } else {
        setMessage('email already exists');
      }
      setTimeout(() => setMessage(''), 5000);
    }
  };

  return (
    <div className="register-container">
      <h2>הרשמה</h2>
      <MessageBanner message={message} type="error" />

      <form onSubmit={handleRegister}>
        <label>שם משתמש:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label>דוא"ל:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>סיסמה:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">הרשמה</button>
      </form>
    </div>
  );
};

export default Register;