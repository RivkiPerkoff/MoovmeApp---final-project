// import React, { useEffect, useState, useContext } from 'react';
// import axios from '../services/axiosInstance';
// import './AdminDashboard.css';
// import { AuthContext } from '../context/AuthContext';
// import { Navigate } from 'react-router-dom';

// const AdminDashboard = () => {
//   const { user } = useContext(AuthContext);
//   const [users, setUsers] = useState([]);
//   const [rides, setRides] = useState([]);
//   const [requestsByRide, setRequestsByRide] = useState([]);

//   useEffect(() => {
//     if (user?.user_type !== 'admin') return;
//     fetchUsers();
//     fetchRides();
//   }, [user]);

//   if (!user || user.user_type !== 'admin') {
//     return <Navigate to="/home" />;
//   }

//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get('/api/users');
//       setUsers(res.data);
//     } catch (err) {
//       console.error('שגיאה בעת שליפת משתמשים:', err);
//     }
//   };

//   const fetchRides = async () => {
//     try {
//       const res = await axios.get('/api/rides');
//       setRides(res.data);
//       fetchRequestsByRides(res.data);
//     } catch (err) {
//       console.error('שגיאה בעת שליפת נסיעות:', err);
//     }
//   };

//   const fetchRequestsByRides = async (ridesList) => {
//     const all = await Promise.all(
//       ridesList.map(async (ride) => {
//         const res = await axios.get(`/api/requests/byRide/${ride._id}`);
//         return { rideId: ride._id, requests: res.data };
//       })
//     );
//     const map = {};
//     all.forEach(entry => {
//       map[entry.rideId] = entry.requests;
//     });
//     setRequestsByRide(map);
//   };

//   const handleDeleteUser = async (userId) => {
//     try {
//       await axios.delete(`/api/users/${userId}`);
//       setUsers(prev => prev.filter(u => u._id !== userId));
//       alert('🗑️ המשתמש נמחק בהצלחה');
//     } catch (err) {
//       console.error('שגיאה במחיקת משתמש:', err);
//     }
//   };

//   const handleDeleteRide = async (rideId) => {
//     try {
//       await axios.delete(`/api/rides/${rideId}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//       });
//       setRides(prev => prev.filter(r => r._id !== rideId));
//       alert('🗑️ הנסיעה נמחקה בהצלחה');
//     } catch (err) {
//       console.error('שגיאה במחיקת נסיעה:', err);
//     }
//   };

//   const approveRequest = async (requestId) => {
//     try {
//       await axios.patch(`/api/requests/${requestId}`, { status: 'approved' });
//       fetchRides();
//     } catch (err) {
//       console.error('שגיאה באישור בקשה:', err);
//     }
//   };

//   const rejectRequest = async (requestId) => {
//     try {
//       await axios.patch(`/api/requests/${requestId}`, { status: 'rejected' });
//       fetchRides();
//     } catch (err) {
//       console.error('שגיאה בדחיית בקשה:', err);
//     }
//   };

//   return (
//     <div className="admin-dashboard">
//       <h2>ניהול מערכת</h2>

//       <section>
//         <h3>משתמשים ({users.length})</h3>
//         <ul>
//           {users.map((u) => (
//             <li key={u._id} className="user-item">
//               <span>{u.username}</span>
//               <span className={`role-badge role-${u.user_type}`}>{u.user_type}</span>
//               <button onClick={() => handleDeleteUser(u._id)}>🗑️ מחק</button>
//             </li>
//           ))}
//         </ul>
//       </section>

//       <section>
//         <h3>נסיעות ({rides.length})</h3>
//         <ul>
//           {rides.map((r) => (
//             <li key={r._id} className="ride-item">
//               <span>{r.from_city} → {r.destination_city}</span>
//               <span className="ride-date">{new Date(r.departure_time).toLocaleString('he-IL')}</span>
//               <button onClick={() => handleDeleteRide(r._id)}>🗑️ מחק נסיעה</button>

//               {requestsByRide[r._id]?.length > 0 && (
//                 <ul style={{ marginTop: '0.5rem', paddingRight: '1rem' }}>
//                   {requestsByRide[r._id].map(req => (
//                     <li key={req._id}>
//                       {req.passenger_id?.username} ביקש {req.seats_requested} מקומות – סטטוס: {req.status}
//                       <button onClick={() => approveRequest(req._id)}>✅ אשר</button>
//                       <button onClick={() => rejectRequest(req._id)}>❌ דחה</button>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </li>
//           ))}
//         </ul>
//       </section>
//     </div>
//   );
// };

// export default AdminDashboard;


// import React, { useEffect, useState, useContext } from 'react';
// import axios from '../services/axiosInstance';
// import './AdminDashboard.css';
// import { AuthContext } from '../context/AuthContext';
// import { Navigate } from 'react-router-dom';

// const AdminDashboard = () => {
//   const { user } = useContext(AuthContext);
//   const [users, setUsers] = useState([]);
//   const [rides, setRides] = useState([]);
//   const [requestsByRide, setRequestsByRide] = useState([]);

//   useEffect(() => {
//     if (user?.user_type !== 'admin') return;
//     fetchUsers();
//     fetchRides();
//   }, [user]);

//   if (!user || user.user_type !== 'admin') {
//     return <Navigate to="/home" />;
//   }

//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get('/api/users');
//       setUsers(res.data);
//     } catch (err) {
//       console.error('שגיאה בעת שליפת משתמשים:', err);
//     }
//   };

//   const fetchRides = async () => {
//     try {
//       const res = await axios.get('/api/rides');
//       setRides(res.data);
//       fetchRequestsByRides(res.data);
//     } catch (err) {
//       console.error('שגיאה בעת שליפת נסיעות:', err);
//     }
//   };

//   const fetchRequestsByRides = async (ridesList) => {
//     const all = await Promise.all(
//       ridesList.map(async (ride) => {
//         const res = await axios.get(`/api/requests/byRide/${ride._id}`);
//         return { rideId: ride._id, requests: res.data };
//       })
//     );
//     const map = {};
//     all.forEach(entry => {
//       map[entry.rideId] = entry.requests;
//     });
//     setRequestsByRide(map);
//   };

//   const handleDeleteUser = async (userId) => {
//     try {
//       await axios.delete(`/api/users/${userId}`);
//       setUsers(prev => prev.filter(u => u._id !== userId));
//       alert('🗑️ המשתמש נמחק בהצלחה');
//     } catch (err) {
//       console.error('שגיאה במחיקת משתמש:', err);
//     }
//   };

//   const handleDeleteRide = async (rideId) => {
//     try {
//       await axios.delete(`/api/rides/${rideId}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`
//         }
//       });
//       setRides(prev => prev.filter(r => r._id !== rideId));
//       alert('🗑️ הנסיעה נמחקה בהצלחה');
//     } catch (err) {
//       console.error('שגיאה במחיקת נסיעה:', err);
//     }
//   };

//   const approveRequest = async (requestId) => {
//     try {
//       await axios.patch(`/api/requests/${requestId}`, { status: 'approved' });
//       fetchRides();
//     } catch (err) {
//       console.error('שגיאה באישור בקשה:', err);
//     }
//   };

//   const rejectRequest = async (requestId) => {
//     try {
//       await axios.patch(`/api/requests/${requestId}`, { status: 'rejected' });
//       fetchRides();
//     } catch (err) {
//       console.error('שגיאה בדחיית בקשה:', err);
//     }
//   };

//   return (
//     <div className="admin-dashboard">
//       <h2>ניהול מערכת</h2>

//       <section>
//         <h3>משתמשים ({users.length})</h3>
//         <ul>
//           {users.map((u) => (
//             <li key={u._id} className="user-item">
//               <span>{u.username}</span>
//               <span className={`role-badge role-${u.user_type}`}>{u.user_type}</span>
//               {/* הצג כפתור מחיקה רק אם המשתמש אינו מנהל */}
//               {u.user_type !== 'admin' && (
//                 <button onClick={() => handleDeleteUser(u._id)}>🗑️ מחק</button>
//               )}
//             </li>
//           ))}
//         </ul>
//       </section>

//       <section>
//         <h3>נסיעות ({rides.length})</h3>
//         <ul>
//           {rides.map((r) => (
//             <li key={r._id} className="ride-item">
//               <span>{r.from_city} → {r.destination_city}</span>
//               <span className="ride-date">{new Date(r.departure_time).toLocaleString('he-IL')}</span>
//               <button onClick={() => handleDeleteRide(r._id)}>🗑️ מחק נסיעה</button>

//               {requestsByRide[r._id]?.length > 0 && (
//                 <ul style={{ marginTop: '0.5rem', paddingRight: '1rem' }}>
//                   {requestsByRide[r._id].map(req => (
//                     <li key={req._id}>
//                       {req.passenger_id?.username} ביקש {req.seats_requested} מקומות – סטטוס: {req.status}
//                       <button onClick={() => approveRequest(req._id)}>✅ אשר</button>
//                       <button onClick={() => rejectRequest(req._id)}>❌ דחה</button>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </li>
//           ))}
//         </ul>
//       </section>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useEffect, useState, useContext } from 'react';
import axios from '../services/axiosInstance';
import './AdminDashboard.css';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [rides, setRides] = useState([]);
  const [requestsByRide, setRequestsByRide] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmData, setConfirmData] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user?.user_type !== 'admin') return;
    fetchUsers();
    fetchRides();
  }, [user]);

  if (!user || user.user_type !== 'admin') {
    return <Navigate to="/home" />;
  }

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/api/users');
      setUsers(res.data);
    } catch (err) {
      console.error('שגיאה בעת שליפת משתמשים:', err);
    }
  };

  const fetchRides = async () => {
    try {
      const res = await axios.get('/api/rides');
      setRides(res.data);
      fetchRequestsByRides(res.data);
    } catch (err) {
      console.error('שגיאה בעת שליפת נסיעות:', err);
    }
  };

  const fetchRequestsByRides = async (ridesList) => {
    const all = await Promise.all(
      ridesList.map(async (ride) => {
        const res = await axios.get(`/api/requests/byRide/${ride._id}`);
        return { rideId: ride._id, requests: res.data };
      })
    );
    const map = {};
    all.forEach(entry => {
      map[entry.rideId] = entry.requests;
    });
    setRequestsByRide(map);
  };

  const approveRequest = async (requestId) => {
    try {
      await axios.patch(`/api/requests/${requestId}`, { status: 'approved' });
      fetchRides();
    } catch (err) {
      console.error('שגיאה באישור בקשה:', err);
    }
  };

  const rejectRequest = async (requestId) => {
    try {
      await axios.patch(`/api/requests/${requestId}`, { status: 'rejected' });
      fetchRides();
    } catch (err) {
      console.error('שגיאה בדחיית בקשה:', err);
    }
  };

  const confirmDelete = (type, id) => {
    setConfirmData({ type, id });
    setShowConfirm(true);
  };

  const handleDeleteConfirmed = async () => {
    if (!confirmData) return;

    try {
      if (confirmData.type === 'user') {
        await axios.delete(`/api/users/${confirmData.id}`);
        setUsers(prev => prev.filter(u => u._id !== confirmData.id));
        setMessage('🗑️ המשתמש נמחק בהצלחה');
      } else if (confirmData.type === 'ride') {
        await axios.delete(`/api/rides/${confirmData.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setRides(prev => prev.filter(r => r._id !== confirmData.id));
        setMessage('🗑️ הנסיעה נמחקה בהצלחה');
      }
      setShowConfirm(false);
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('שגיאה במחיקה:', err);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>ניהול מערכת</h2>

      {message && <div className="toast-message">{message}</div>}

      <section>
        <h3>משתמשים ({users.length})</h3>
        <ul>
          {users.map((u) => (
            <li key={u._id} className="user-item">
              <span>{u.username}</span>
              <span className={`role-badge role-${u.user_type}`}>{u.user_type}</span>
              {u.user_type !== 'admin' && (
                <button onClick={() => confirmDelete('user', u._id)}>🗑️ מחק</button>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>נסיעות ({rides.length})</h3>
        <ul>
          {rides.map((r) => (
            <li key={r._id} className="ride-item">
              <span>{r.from_city} → {r.destination_city}</span>
              <span className="ride-date">{new Date(r.departure_time).toLocaleString('he-IL')}</span>
              <button onClick={() => confirmDelete('ride', r._id)}>🗑️ מחק נסיעה</button>

              {requestsByRide[r._id]?.length > 0 && (
                <ul style={{ marginTop: '0.5rem', paddingRight: '1rem' }}>
                  {requestsByRide[r._id].map(req => (
                    <li key={req._id}>
                      {req.passenger_id?.username} ביקש {req.seats_requested} מקומות – סטטוס: {req.status}
                      <button onClick={() => approveRequest(req._id)}>✅ אשר</button>
                      <button onClick={() => rejectRequest(req._id)}>❌ דחה</button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </section>

      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>האם אתה בטוח שברצונך למחוק?</p>
            <div className="modal-buttons">
              <button onClick={handleDeleteConfirmed} className="btn-confirm">כן, מחק</button>
              <button onClick={() => setShowConfirm(false)} className="btn-cancel">ביטול</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
