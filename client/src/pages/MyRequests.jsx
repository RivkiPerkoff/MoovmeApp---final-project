import { useEffect, useState, useContext } from 'react';
import axios from '../services/axiosInstance';
import { AuthContext } from '../context/AuthContext';
import MessageBanner from '../components/MessageBanner';
import LoadingIndicator from '../components/LoadingIndicator';
import './MyRequests.css';


const MyRequests = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get('/api/requests/my');
        setRequests(res.data);
      } catch (err) {
        console.error('שגיאה בשליפת הבקשות שלי:', err);
        setMessage('❌ שגיאה בטעינת הבקשות');
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleCancel = async (id) => {
    try {
      await axios.delete(`/api/requests/${id}`);
      setRequests((prev) => prev.filter((req) => req._id !== id));
      setMessage('✅ הבקשה בוטלה בהצלחה');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('שגיאה בביטול בקשה:', err);
      setMessage('❌ לא ניתן לבטל את הבקשה');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (loading) return <LoadingIndicator />;

  return (
    <div className="container">
      <h2>הבקשות שלי</h2>
      <MessageBanner message={message} type={message.includes('❌') ? 'error' : 'success'} />

      {requests.length === 0 ? (
        <p>לא הגשת בקשות להצטרפות.</p>
      ) : (
        <ul className="request-list">
          {requests.map((req) => (
            <li key={req._id} className="request-item">
              נסיעה: {req.ride_id?.from} → {req.ride_id?.to} בתאריך {new Date(req.ride_id?.departure_time).toLocaleString('he-IL')}<br />
              מקומות שביקשת: {req.seats_requested}, סטטוס: {req.status}
              {req.status === 'pending' && (
                <button className="btn btn-danger" onClick={() => handleCancel(req._id)}>
                  בטל בקשה
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyRequests;
