import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Header.css';

const Header = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    logoutUser();
    navigate('/login', { replace: true });
  };

  const isAdmin = user?.user_type === 'admin';
  const isDriver = user?.user_type === 'driver';
  const isPassenger = user?.user_type === 'passenger';
  const isOnAdminPage = location.pathname === '/admin';

  return (
    <header className="main-header">
      <div className="logo">
        <Link to="/home">MoovMe</Link>
      </div>

      <nav className="nav-links">
        {user && <span className="username">שלום, {user.username}</span>}

        <div className="nav-actions">
          {isDriver && (
            <>
              <Link to="/ride/new">פרסם נסיעה</Link>
              <Link to="/ride-requests">בקשות לנסיעות</Link>
            </>
          )}

          {isPassenger && (
            <>
              <Link to="/my-requests">הבקשות שלי</Link>
              <Link to="/my-joined-rides">נסיעות שהצטרפתי אליהן</Link>
            </>
          )}

          {isAdmin && (
            isOnAdminPage ? (
              <button className="nav-button home-btn" onClick={() => navigate('/home')}>
                🏠 חזרה לדף הבית
              </button>
            ) : (
              <button className="nav-button admin-btn" onClick={() => navigate('/admin')}>
                ⚙️ ניהול מערכת
              </button>
            )
          )}

          {user ? (
            <button className="logout-btn" onClick={handleLogout}>התנתק</button>
          ) : (
            <>
              <Link to="/login">התחבר</Link>
              <Link to="/register">הרשמה</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
