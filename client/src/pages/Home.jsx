import { useEffect, useState, useContext } from 'react';
import axios from '../services/axiosInstance';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import RideForm from './RideForm'; // ודא שהנתיב תקין

const Home = () => {
  const { user } = useContext(AuthContext);
  const [allRides, setAllRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMyRides, setShowMyRides] = useState(false);
  const [showForm, setShowForm] = useState(false); // ניהול הצגת הטופס

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const res = await axios.get('/api/rides');
        console.log('🔍 כל הנסיעות מהשרת:', res.data); // ⬅️ כאן תראה את כל השדות כולל driver_id
        setAllRides(res.data);
      } catch (err) {
        console.error('שגיאה בשליפת נסיעות:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRides();
  }, []);


  const myRides = allRides.filter(ride => ride.driver_id?._id === user?._id);
  const otherRides = allRides.filter(ride => ride.driver_id?._id !== user?._id);

  return (
    <div className="container">
      <h1>ברוך הבא{user ? `, ${user.username}` : ''}!</h1>
      <p>מצא נסיעה שמתאימה לך או פרסם אחת חדשה.</p>

      <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          + פרסם נסיעה חדשה
        </button>

        <button
          onClick={() => setShowMyRides(prev => !prev)}
          style={{ marginRight: '1rem' }}
        >
          {showMyRides ? 'הסתר את הנסיעות שלי' : 'הצג את הנסיעות שלי'}
        </button>
      </div>

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

      {/* קופץ עם טופס */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowForm(false)} style={{ float: 'left' }}>❌</button>
            <RideForm onClose={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
