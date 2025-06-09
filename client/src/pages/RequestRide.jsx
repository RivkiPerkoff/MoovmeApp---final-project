import { useState } from 'react';
import axios from 'axios';

const RequestRide = ({ rideId, passengerId }) => {
  const [note, setNote] = useState('');
  const [message, setMessage] = useState('');

  const handleRequest = async () => {
    try {
      const response = await axios.post('/api/requests', {
        ride_id: rideId,
        passenger_id: passengerId,
        note
      });
      setMessage('הבקשה נשלחה בהצלחה');
    } catch (err) {
      setMessage('שגיאה בשליחת הבקשה');
    }
  };

  return (
    <div>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="הערות לנהג (לא חובה)"
      />
      <button onClick={handleRequest}>שלח בקשת הצטרפות</button>
      <p>{message}</p>
    </div>
  );
};

export default RequestRide;
