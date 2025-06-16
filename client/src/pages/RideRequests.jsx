import { useEffect, useState } from 'react';
import axios from '../services/axiosInstance';
import MessageBanner from '../components/MessageBanner';
import LoadingIndicator from '../components/LoadingIndicator';
import './RideRequests.css';


const RideRequests = () => {
  const [requestsByRide, setRequestsByRide] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get('/api/requests/driver');
        setRequestsByRide(res.data);
      } catch (err) {
        console.error('שגיאה בשליפת בקשות:', err);
        setMessage('❌ שגיאה בטעינת בקשות');
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const handleAction = async (id, action) => {
    try {
      await axios.patch(`/api/requests/${id}/${action}`);
      setRequestsByRide((prev) =>
        prev.map((ride) => ({
          ...ride,
          requests: ride.requests.map((req) =>
            req._id === id ? { ...req, status: action } : req
          )
        }))
      );
      setMessage(`✅ הבקשה ${action === 'approved' ? 'אושרה' : 'נדחתה'} בהצלחה`);
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('שגיאה בעדכון בקשה:', err);
      setMessage('❌ שגיאה בטיפול בבקשה');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (loading) return <LoadingIndicator />;

  return (
    <div className="container">
      <h2>בקשות להצטרפות לנסיעות שלך</h2>
      <MessageBanner message={message} type={message.includes('❌') ? 'error' : 'success'} />

      {requestsByRide.length === 0 ? (
        <p>אין בקשות להצטרפות לנסיעות שלך.</p>
      ) : (
        <div className="ride-requests">
          {requestsByRide.map((ride) => (
            <div key={ride._id} className="ride-block">
              <h4>נסיעה: {ride.from} → {ride.to} ב-{new Date(ride.departure_time).toLocaleString('he-IL')}</h4>
              <ul className="request-list">
                {ride.requests.map((req) => (
                  <li key={req._id} className="request-item">
                    {req.passenger_id?.username} ביקש {req.seats_requested} מקומות - סטטוס: {req.status}
                    {req.status === 'pending' && (
                      <>
                        <button className="btn btn-success" onClick={() => handleAction(req._id, 'approved')}>אשר</button>
                        <button className="btn btn-danger" onClick={() => handleAction(req._id, 'rejected')}>דחה</button>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RideRequests;
