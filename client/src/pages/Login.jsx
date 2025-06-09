// import { useState } from 'react';
// import { login } from '../services/authService';
// import { Link, useNavigate } from 'react-router-dom'; // הוספנו useNavigate

// const Login = () => {
//   const [credentials, setCredentials] = useState({ email: '', password: '' });
//   const navigate = useNavigate();

//   const handleChange = e => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     try {
//       const res = await login(credentials);
//       localStorage.setItem('token', res.data.token);
//       alert('התחברת בהצלחה!');
//       navigate('/home'); // מעבר לעמוד הבית
//     } catch (err) {
//       alert(err.response?.data?.message || 'שגיאה בהתחברות');
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input name="email" type="email" placeholder="אימייל" onChange={handleChange} required />
//         <input name="password" type="password" placeholder="סיסמה" onChange={handleChange} required />
//         <button type="submit">התחברות</button>
//       </form>
//       <p>אין לך חשבון? <Link to="/register">להרשמה לחץ כאן</Link></p>
//     </div>
//   );
// };

// export default Login;

import { useState, useContext } from 'react';
import { login } from '../services/authService';
import { Home } from '../services/authService';

import { Link,useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = e => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await login(credentials);
      localStorage.setItem('token', res.data.token);
      loginUser(res.data.user); // מעדכן את ההקשר עם פרטי המשתמש
      alert('התחברת בהצלחה!');
      navigate('/Home'); // מעבר לדף הבית
    } catch (err) {
      alert(err.response?.data?.message || 'שגיאה בהתחברות');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="אימייל" onChange={handleChange} required />
        <input name="password" type="password" placeholder="סיסמה" onChange={handleChange} required />
        <button type="submit">התחברות</button>
      </form>
      <p>אין לך חשבון? <Link to="/register">להרשמה לחץ כאן</Link></p>
    </div>
  );
};

export default Login;
