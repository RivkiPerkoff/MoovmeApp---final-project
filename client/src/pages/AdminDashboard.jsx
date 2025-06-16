import React, { useEffect, useState } from 'react';
import axios from '../services/axiosInstance';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [rides, setRides] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchRides();
  }, []);

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
    } catch (err) {
      console.error('שגיאה בעת שליפת נסיעות:', err);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>ניהול מערכת</h2>

      <section>
        <h3>משתמשים ({users.length})</h3>
        <ul>
          {users.map((u) => (
            <li key={u.id} className="user-item">
              <span>{u.username}</span>
              <span className={`role-badge role-${u.role}`}>{u.role}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3>נסיעות ({rides.length})</h3>
        <ul>
          {rides.map((r) => (
            <li key={r.id} className="ride-item">
              <span>{r.origin} → {r.destination}</span>
              <span className="ride-date">{r.date}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminDashboard;
