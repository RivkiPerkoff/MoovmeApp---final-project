import { useEffect, useState } from 'react';
import axios from 'axios';

const MyRequests = ({ userId }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get('/api/requests');
      const myRequests = res.data.filter(r => r.passenger_id === userId);
      setRequests(myRequests);
    };
    fetch();
  }, [userId]);

  return (
    <div>
      <h2>הבקשות שלי</h2>
      {requests.map(r => (
        <div key={r._id}>
          <p>לנסיעה: {r.ride_id}</p>
          <p>סטטוס: {r.status}</p>
        </div>
      ))}
    </div>
  );
};

export default MyRequests;
