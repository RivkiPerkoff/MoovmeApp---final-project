import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get('/api/requests');
        const userRequests = res.data.filter(r => r.passenger_id === user._id);
        setRequests(userRequests);
      } catch (err) {
        console.error(err);
      }
    };

    if (user) fetchRequests();
  }, [user]);

  return (
    <div>
      <h2>הבקשות שלי</h2>
      {requests.map(req => (
        <div key={req._id}>
          <p>נסיעה: {req.ride_id}</p>
          <p>סטטוס: {req.status}</p>
          <p>הערה: {req.note}</p>
        </div>
      ))}
    </div>
  );
};

export default MyRequests;
