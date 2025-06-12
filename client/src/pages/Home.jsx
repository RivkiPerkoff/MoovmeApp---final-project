
import { useEffect, useState, useContext } from 'react';
import axios from '../services/axiosInstance';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import RideForm from './RideForm';

const Home = () => {
  const { user } = useContext(AuthContext);
  const [allRides, setAllRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMyRides, setShowMyRides] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState('');
  const [rideToEdit, setRideToEdit] = useState(null);
  const [requestsByRide, setRequestsByRide] = useState({});

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const res = await axios.get('/api/rides');
        setAllRides(res.data);
      } catch (err) {
        console.error('שגיאה בשליפת נסיעות:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRides();
  }, []);

  useEffect(() => {
    const fetchRequests = async () => {
      const all = await Promise.all(
        myRides.map(async (ride) => {
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

    if (showMyRides) {
      fetchRequests();
    }
  }, [showMyRides, allRides]);

  const handleDeleteRide = async (rideId) => {
    try {
      await axios.delete(`/api/rides/${rideId}`);
      setAllRides((prev) => prev.filter((ride) => ride._id !== rideId));
      setMessage('✅ הנסיעה נמחקה בהצלחה.');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('שגיאה במחיקת נסיעה:', err);
      setMessage('❌ שגיאה במחיקת נסיעה.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const myRides = allRides.filter(ride => ride.driver_id?._id === user?._id);
  const otherRides = allRides.filter(ride => ride.driver_id?._id !== user?._id);

  return (
    <div className="container">
      <h1>ברוך הבא{user ? `, ${user.username}` : ''}!</h1>
      <p>מצא נסיעה שמתאימה לך או פרסם אחת חדשה.</p>

      <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
        <button className="btn btn-primary" onClick={() => {
          setRideToEdit(null);
          setShowForm(true);
        }}>
          + פרסם נסיעה חדשה
        </button>

        <button
          onClick={() => setShowMyRides(prev => !prev)}
          style={{ marginRight: '1rem' }}
        >
          {showMyRides ? 'הסתר את הנסיעות שלי' : 'הצג את הנסיעות שלי'}
        </button>
      </div>

      {message && <div style={{ color: 'red', fontWeight: 'bold' }}>{message}</div>}

      <hr />

      {loading ? (
        <p>טוען נסיעות...</p>
      ) : (
        <>
          {showMyRides && (
            <>
              <h2>הנסיעות שלי</h2>
              {myRides.length === 0 ? (
                <p>לא פרסמת נסיעות עדיין.</p>
              ) : (
                <div className="ride-list">
                  {myRides.map(ride => (
                    <div key={ride._id} className="ride-card">
                      <h3>{ride.from} → {ride.to}</h3>
                      <p>תאריך: {new Date(ride.departure_time).toLocaleString('he-IL')}</p>
                      <p>מקומות פנויים: {ride.available_seats}</p>
                      <Link to={`/rides/${ride._id}`}>לפרטים</Link>
                      <button
                        onClick={() => handleDeleteRide(ride._id)}
                        className="btn btn-danger"
                        style={{ marginTop: '0.5rem', marginRight: '0.5rem' }}
                      >
                        🗑️ מחק נסיעה
                      </button>
                      <button
                        onClick={() => {
                          setRideToEdit(ride);
                          setShowForm(true);
                        }}
                        className="btn btn-warning"
                        style={{ marginTop: '0.5rem', marginRight: '0.5rem' }}
                      >
                        ✏️ ערוך נסיעה
                      </button>
                      {requestsByRide[ride._id]?.length > 0 && (
                        <div>
                          <strong>בקשות להצטרפות:</strong>
                          <ul>
                            {requestsByRide[ride._id].map(req => (
                              <li key={req._id}>
                                {req.passenger_id.username} ביקש {req.seats_requested} מקומות - סטטוס: {req.status}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              <hr />
            </>
          )}

          <h2>נסיעות זמינות</h2>
          {otherRides.length === 0 ? (
            <p>אין כרגע נסיעות זמינות ממשתמשים אחרים.</p>
          ) : (
            <div className="ride-list">
              {otherRides.map(ride => (
                <div key={ride._id} className="ride-card">
                  <h3>{ride.from} → {ride.to}</h3>
                  <p>תאריך: {new Date(ride.departure_time).toLocaleString('he-IL')}</p>
                  <p>מקומות פנויים: {ride.available_seats}</p>
                  <Link to={`/rides/${ride._id}`}>לפרטים</Link>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowForm(false)} style={{ float: 'left' }}>❌</button>
            <RideForm
              onClose={() => setShowForm(false)}
              initialRide={rideToEdit}
              onRideAdded={(newRide) => {
                if (rideToEdit) {
                  setAllRides((prev) =>
                    prev.map(r => r._id === newRide._id ? newRide : r)
                  );
                } else {
                  setAllRides((prev) => [...prev, newRide]);
                }
                setShowForm(false);
                setRideToEdit(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
