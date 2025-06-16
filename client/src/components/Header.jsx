import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <header className="main-header">
      <div className="logo">
        <Link to="/Home">MoovMe</Link>
      </div>
      <nav className="nav-links">
        {user && user.role === 'driver' && (
          <>
            <Link to="/my-rides">הנסיעות שלי</Link>
            <Link to="/add-ride">פרסם נסיעה</Link>
            <Link to="/ride-requests">בקשות לנסיעות</Link>
          </>
        )}
        {user && user.role === 'passenger' && (
          <>
            <Link to="/my-requests">הבקשות שלי</Link>
          </>
        )}
        {user && user.role === 'admin' && (
          <>
            <Link to="/admin">ניהול מערכת</Link>
          </>
        )}
        {user ? (
          <>
            <span className="username">שלום, {user.username}</span>
            <button className="logout-btn" onClick={handleLogout}>התנתק</button>
          </>
        ) : (
          <>
            <Link to="/login">התחבר</Link>
            <Link to="/register">הרשמה</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
