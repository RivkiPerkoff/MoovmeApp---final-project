

import { useState, useContext } from 'react';
import { register } from '../services/authService';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', user_type: 'user' });
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await register(formData);
      alert('נרשמת בהצלחה!');
      loginUser(res.data.user); // מעדכן את ההקשר עם פרטי המשתמש
      navigate('/Home'); // מעבר לדף הבית
    } catch (err) {
      alert(err.response?.data?.message || 'שגיאה ברישום');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="שם משתמש" onChange={handleChange} required />
        <input name="email" type="email" placeholder="אימייל" onChange={handleChange} required />
        <input name="password" type="password" placeholder="סיסמה" onChange={handleChange} required />
        <button type="submit">הרשמה</button>
      </form>
      <p>כבר רשום? <Link to="/login">התחבר כאן</Link></p>
    </div>
  );
};

export default Register;
