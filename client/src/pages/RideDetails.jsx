import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../services/axiosInstance';
import { AuthContext } from '../context/AuthContext';

const RideDetails = () => {
  const { id } = useParams(); // מזהה נסיעה מתוך URL
  const { user } = useContext(AuthContext);
  const [ride, setRide] = useState(null);
  const [message, setMessage] = useState('');

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
    try {
      const res = await axios.post('/api/requests', {
        ride_id: id,
        passenger_id: user._id, // מתוך הקונטקסט
      });
      setMessage('הבקשה נשלחה בהצלחה!');
    } catch (err) {
      console.error(err);
      setMessage('אירעה שגיאה בשליחת הבקשה.');
    }
  };

  if (!ride) return <div>טוען פרטי נסיעה...</div>;

  return (
    <div>
      <h2>נסיעה מ: {ride.from} ל: {ride.to}</h2>
      <p><strong>זמן יציאה:</strong> {new Date(ride.departure_time).toLocaleString()}</p>
      <p><strong>מקומות פנויים:</strong> {ride.available_seats}</p>
      <p><strong>הערות:</strong> {ride.notes || 'אין הערות'}</p>
      {ride.car_img && <img src={ride.car_img} alt="תמונה של הרכב" style={{ maxWidth: '300px' }} />}

      {user && user.user_type === 'passenger' && (
        <button onClick={handleJoinRequest}>בקש להצטרף לנסיעה</button>
      )}

      {message && <p>{message}</p>}
    </div>
  );
};

export default RideDetails;
