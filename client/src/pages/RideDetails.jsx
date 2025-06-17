import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../services/axiosInstance';
import { AuthContext } from '../context/AuthContext';
import MessageBanner from '../components/MessageBanner';
import LoadingIndicator from '../components/LoadingIndicator';

const RideDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [ride, setRide] = useState(null);
  const [seatsRequested, setSeatsRequested] = useState(1);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRide = async () => {
      try {
        const res = await axios.get(`/api/rides/${id}`);
        setRide(res.data);
      } catch (err) {
        console.error('שגיאה בטעינת פרטי נסיעה:', err);
        setMessage('❌ שגיאה בטעינת פרטי נסיעה');
      } finally {
        setLoading(false);
      }
    };
    fetchRide();
  }, [id]);

const handleRequest = async () => {
  if (!user || !user._id || !ride || !ride._id) {
    setMessage('🔒 יש להתחבר כדי לשלוח בקשה');
    return;
  }

  const dataToSend = {
    ride_id: ride._id,
    passenger_id: user._id,
    seats_requested: seatsRequested
  };

  try {
    const res = await axios.post(`/api/requests`, dataToSend);
    setMessage('✅ הבקשה נשלחה בהצלחה!');
  } catch (err) {
    console.error('❌ שגיאה בשליחת בקשה:', err);
    setMessage('❌ שגיאה בשליחת בקשה');
  }
  setTimeout(() => setMessage(''), 3000);
};


  if (loading) return <LoadingIndicator />;
  if (!ride) return <p>נסיעה לא נמצאה</p>;

  return (
    <div className="container">
      <h2>פרטי נסיעה</h2>

      <MessageBanner message={message} type={message.includes('❌') ? 'error' : 'success'} />
      <p><strong>עיר מוצא:</strong> {ride.from_city}</p>
      <p><strong>כתובת מוצא:</strong> {ride.from_address}</p>
      <p><strong>עיר יעד:</strong> {ride.destination_city}</p>
      <p><strong>כתובת יעד:</strong> {ride.destination_address}</p>
      <p><strong>שעה:</strong> {new Date(ride.departure_time).toLocaleString('he-IL')}</p>
      <p><strong>מקומות פנויים:</strong> {ride.available_seats}</p>
      <p><strong>נהג:</strong> {ride.driver_id?.username}</p>
      <p>{ride.gender === 'נהג' ? 'נהג' : 'נהגת'}</p>

      {user && user._id !== ride.driver_id?._id && (
        <div className="request-form">
          <label>
            כמות מקומות שברצונך להזמין:
            <input
              type="number"
              min="1"
              max={ride.available_seats}
              value={seatsRequested}
              onChange={(e) => setSeatsRequested(e.target.value)}
            />
          </label>
          <button className="btn btn-success" onClick={handleRequest}>שלח בקשה</button>
        </div>
      )}
    </div>
  );
};

export default RideDetails;
