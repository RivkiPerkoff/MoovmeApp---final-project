// // // // import React, { useContext } from 'react';
// // // // import { Link, useNavigate } from 'react-router-dom';
// // // // import { AuthContext } from '../context/AuthContext';
// // // // import './Header.css';

// // // // const Header = () => {
// // // //   const { user, logoutUser } = useContext(AuthContext);
// // // //   const navigate = useNavigate();

// // // //   const handleLogout = () => {
// // // //     logoutUser();
// // // //     navigate('/login');
// // // //   };

// // // //   return (
// // // //     <header className="main-header">
// // // //       <div className="logo">
// // // //         <Link to="/Home">MoovMe</Link>
// // // //       </div>
// // // //       <nav className="nav-links">
// // // //         {user && user.role === 'driver' && (
// // // //           <>
// // // //             <Link to="/my-rides">הנסיעות שלי</Link>
// // // //             <Link to="/add-ride">פרסם נסיעה</Link>
// // // //             <Link to="/ride-requests">בקשות לנסיעות</Link>
// // // //           </>
// // // //         )}
// // // //         {user && user.role === 'passenger' && (
// // // //           <>
// // // //             <Link to="/my-requests">הבקשות שלי</Link>
// // // //           </>
// // // //         )}
// // // //         {user && user.role === 'admin' && (
// // // //           <>
// // // //             <Link to="/admin">ניהול מערכת</Link>
// // // //           </>
// // // //         )}
// // // //         {user ? (
// // // //           <>
// // // //             <span className="username">שלום, {user.username}</span>
// // // //             <button className="logout-btn" onClick={handleLogout}>התנתק</button>
// // // //           </>
// // // //         ) : (
// // // //           <>
// // // //             <Link to="/login">התחבר</Link>
// // // //             <Link to="/register">הרשמה</Link>
// // // //           </>
// // // //         )}
// // // //       </nav>
// // // //     </header>
// // // //   );
// // // // };

// // // // export default Header;


// // // import React, { useContext } from 'react';
// // // import { Link, useNavigate } from 'react-router-dom';
// // // import { AuthContext } from '../context/AuthContext';
// // // import './Header.css';

// // // const Header = () => {
// // //   const { user, logoutUser } = useContext(AuthContext);
// // //   const navigate = useNavigate();

// // //   const handleLogout = () => {
// // //     logoutUser();
// // //     navigate('/login');
// // //   };

// // //   return (
// // //     <header className="main-header">
// // //       <div className="logo">
// // //         <Link to="/home">MoovMe</Link>
// // //       </div>
// // //       <nav className="nav-links">
// // //         {user && user.user_type === 'driver' && (
// // //           <>
// // //             <Link to="/my-rides">הנסיעות שלי</Link>
// // //             <Link to="/ride/new">פרסם נסיעה</Link>
// // //             <Link to="/ride-requests">בקשות לנסיעות</Link>
// // //           </>
// // //         )}
// // //         {user && user.user_type === 'passenger' && (
// // //           <>
// // //             <Link to="/my-requests">הבקשות שלי</Link>
// // //             <Link to="/my-joined-rides">נסיעות שהצטרפתי אליהן</Link>
// // //           </>
// // //         )}
// // //         {user && user.user_type === 'admin' && (
// // //           <>
// // //             <Link to="/admin">ניהול מערכת</Link>
// // //           </>
// // //         )}
// // //         {user ? (
// // //           <>
// // //             <span className="username">שלום, {user.username}</span>
// // //             <button className="logout-btn" onClick={handleLogout}>התנתק</button>
// // //           </>
// // //         ) : (
// // //           <>
// // //             <Link to="/login">התחבר</Link>
// // //             <Link to="/register">הרשמה</Link>
// // //           </>
// // //         )}
// // //       </nav>
// // //     </header>
// // //   );
// // // };

// // // export default Header;

// // // Header.jsx
// // import React, { useContext } from 'react';
// // import { Link, useNavigate, useLocation } from 'react-router-dom';
// // import { AuthContext } from '../context/AuthContext';
// // import './Header.css';

// // const Header = () => {
// //   const { user, logoutUser } = useContext(AuthContext);
// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   const handleLogout = () => {
// //     logoutUser();
// //     localStorage.removeItem('token');
// //     navigate('/login');
// //   };

// //   return (
// //     <header className="main-header">
// //       <div className="logo">
// //         <Link to="/home">MoovMe</Link>
// //       </div>
// //       <nav className="nav-links">
// //         {user?.role === 'driver' && (
// //           <>
// //             <Link to="/my-rides">הנסיעות שלי</Link>
// //             <Link to="/add-ride">פרסם נסיעה</Link>
// //             <Link to="/ride-requests">בקשות לנסיעות</Link>
// //           </>
// //         )}
// //         {user?.role === 'passenger' && <Link to="/my-requests">הבקשות שלי</Link>}
// //         {user && (
// //           <>
// //             {/* כפתור 'ניהול מערכת' רק אם המשתמש הוא מנהל */}
// //             {user.role === 'admin' && (
// //               <>
// //                 {location.pathname !== '/admin' ? (
// //                   <button className="admin-btn" onClick={() => navigate('/admin')}>
// //                     ניהול מערכת
// //                   </button>
// //                 ) : (
// //                   <button className="home-btn" onClick={() => navigate('/home')}>
// //                     דף הבית
// //                   </button>
// //                 )}
// //               </>
// //             )}
// //             <span className="username">שלום, {user.username}</span>
// //             <button className="logout-btn" onClick={handleLogout}>התנתק</button>
// //           </>
// //         )}
// //         {!user && (
// //           <>
// //             <Link to="/login">התחבר</Link>
// //             <Link to="/register">הרשמה</Link>
// //           </>
// //         )}
// //       </nav>
// //     </header>
// //   );
// // };

// // export default Header;


// import React, { useContext } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import './Header.css';

// const Header = () => {
//   const { user, logoutUser } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     logoutUser();
//     navigate('/login');
//   };

//   const isAdmin = user?.user_type === 'admin';
//   const isOnAdminPage = location.pathname === '/admin';

//   return (
//     <header className="main-header">
//       <div className="logo">
//         <Link to="/home">MoovMe</Link>
//       </div>

//       <nav className="nav-links">
//         {user && (
//           <>
//             {/* קישורים רגילים */}
//             <Link to="/ride/new">פרסם נסיעה</Link>
//             <Link to="/my-requests">הבקשות שלי</Link>
//             <Link to="/my-joined-rides">נסיעות שהצטרפתי אליהן</Link>

//             {/* למנהל בלבד */}
//             {isAdmin && !isOnAdminPage && (
//               <button className="admin-btn" onClick={() => navigate('/admin')}>
//                 ניהול מערכת
//               </button>
//             )}

//             {/* כפתור חזרה לדף הבית אם בעמוד admin */}
//             {isAdmin && isOnAdminPage && (
//               <button className="home-btn" onClick={() => navigate('/home')}>
//                 חזרה לדף הבית
//               </button>
//             )}

//             {/* שם משתמש + התנתקות */}
//             <span className="username">שלום, {user.username}</span>
//             <button className="logout-btn" onClick={handleLogout}>
//               התנתק
//             </button>
//           </>
//         )}

//         {!user && (
//           <>
//             <Link to="/login">התחבר</Link>
//             <Link to="/register">הרשמה</Link>
//           </>
//         )}
//       </nav>
//     </header>
//   );
// };

// export default Header;

// src/components/Header.jsx

// src/components/Header.jsx
// import React, { useContext } from 'react';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import './Header.css';

// const Header = () => {
//   const { user, logoutUser } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     logoutUser();
//     navigate('/login');
//   };

//   return (
//     <header className="main-header">
//       <div className="logo">
//         <Link to="/home">MoovMe</Link>
//       </div>
//       <nav className="nav-links">
//         {user?.user_type === 'driver' && (
//           <>
//             <Link to="/ride/new">פרסם נסיעה</Link>
//             <Link to="/ride-requests">בקשות לנסיעות</Link>
//           </>
//         )}
//         {user?.user_type === 'passenger' && (
//           <Link to="/my-requests">הבקשות שלי</Link>
//         )}
//         {user && (
//           <Link to="/my-joined-rides">נסיעות שהצטרפתי אליהן</Link>
//         )}

//         {/* ניווט למנהל בלבד */}
//         {user?.user_type === 'admin' && (
//           <>
//             {location.pathname === '/admin' ? (
//               <button className="nav-button home-btn" onClick={() => navigate('/home')}>
//                 🏠 לעמוד הבית
//               </button>
//             ) : (
//               <button className="nav-button admin-btn" onClick={() => navigate('/admin')}>
//                 ⚙️ ניהול מערכת
//               </button>
//             )}
//           </>
//         )}

//         {user ? (
//           <>
//             <span className="username">שלום, {user.username}</span>
//             <button className="logout-btn" onClick={handleLogout}>התנתק</button>
//           </>
//         ) : (
//           <>
//             <Link to="/login">התחבר</Link>
//             <Link to="/register">הרשמה</Link>
//           </>
//         )}
//       </nav>
//     </header>
//   );
// };

// export default Header;

// src/components/Header.jsx
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
    navigate('/login');
  };

  return (
    <header className="main-header">
      <div className="logo">
        <Link to="/home">MoovMe</Link>
      </div>

      <nav className="nav-links">
        {/* צד ימין – טקסט שלום */}
        {user && <span className="username">שלום, {user.username}</span>}

        {/* צד שמאל – כפתורים */}
        <div className="nav-actions">
          {user?.user_type === 'admin' && (
            location.pathname === '/admin' ? (
              <button className="nav-button home-btn" onClick={() => navigate('/home')}>
                🏠 לעמוד הבית
              </button>
            ) : (
              <button className="nav-button admin-btn" onClick={() => navigate('/admin')}>
                ⚙️ ניהול מערכת
              </button>
            )
          )}

          {user && (
            <button className="logout-btn" onClick={handleLogout}>התנתק</button>
          )}

          {!user && (
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

