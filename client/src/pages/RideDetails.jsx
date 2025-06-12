import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../services/axiosInstance';
import { AuthContext } from '../context/AuthContext';
// import RequestRide from './RequestRide';
import { useNavigate } from 'react-router-dom';

const RideDetails = () => {
  const { id } = useParams(); // מזהה נסיעה מתוך URL
  const { user } = useContext(AuthContext);
  const [ride, setRide] = useState(null);
  const [message, setMessage] = useState('');
  const [seatsRequested, setSeatsRequested] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRide = async () => {
      try {
        console.log('🔍 מנסה להביא נסיעה עם ID:', id);
        const res = await axios.get(`/api/rides/${id}`);
        console.log('✅ נסיעה שהתקבלה:', res.data);
        setRide(res.data);
      } catch (err) {
        console.error('❌ שגיאה בשליפת נסיעה:', err.response || err);
      }
    };

    fetchRide();
  }, [id]);

const handleJoinRequest = async () => {
  if (!user || !user._id || !ride || !ride._id) {
    setMessage('🔒 יש להתחבר כדי לשלוח בקשה');
    return;
  }

  const dataToSend = {
    ride_id: ride._id,
    passenger_id: user._id,
    seats_requested: seatsRequested
  };

  console.log("📤 שליחת בקשה עם הנתונים:", dataToSend);

  try {
    const response = await axios.post('/api/requests', dataToSend, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    console.log("✅ תגובת השרת:", response.data);
    setMessage('הבקשה נשלחה בהצלחה!');
  } catch (err) {
    console.error("❌ שגיאה בשליחת הבקשה:", err.response?.data || err.message);
    setMessage(err.response?.data?.message || '❌ אירעה שגיאה בשליחת הבקשה.');
  }
};




  if (!ride) return <div>טוען פרטי נסיעה...</div>;

  return (
    <div>
      <button onClick={() => navigate('/Home')}>
        חזור לעמוד הבית
      </button>

      <h2>נסיעה מ: {ride.from} ל: {ride.to}</h2>
      <p><strong>זמן יציאה:</strong> {new Date(ride.departure_time).toLocaleString()}</p>
      <p><strong>מקומות פנויים:</strong> {ride.available_seats}</p>
      <p><strong>הערות:</strong> {ride.notes || 'אין הערות'}</p>
      {ride.car_img && <img src={ride.car_img} alt="תמונה של הרכב" style={{ maxWidth: '300px' }} />}

      {/* {user && user.user_type === 'passenger' && (
        <button onClick={handleJoinRequest}>בקש להצטרף לנסיעה</button>
      )} */}
      {user?.user_type === 'user' && ride.available_seats > 0 && (
        <>
          <label>כמה מקומות אתה צריך?</label>
          <select value={seatsRequested} onChange={(e) => setSeatsRequested(Number(e.target.value))}>
            {[...Array(ride.available_seats)].map((_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
          <button onClick={handleJoinRequest}>אני רוצה להצטרף לנסיעה</button>
        </>
      )}



      {message && <p>{message}</p>}
    </div>
  );
};

export default RideDetails;
