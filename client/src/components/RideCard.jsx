import './RideCard.css';
import { Link } from 'react-router-dom';

const RideCard = ({ ride, isMine, onEdit, onDelete, requests }) => (
  <div className="ride-card">
    <h3>
       {ride.from_city} ⬅ {ride.destination_city}
    </h3>
    <p>תאריך: {new Date(ride.departure_time).toLocaleString('he-IL')}</p>
    <p>מקומות פנויים: {ride.available_seats}</p>
    <Link to={`/rides/${ride._id}`}>לפרטים</Link>

    {isMine && (
      <div style={{ marginTop: '0.5rem' }}>
        <button className="btn btn-warning" onClick={() => onEdit(ride)}>✏️ ערוך</button>
        <button className="btn btn-danger" onClick={() => onDelete(ride._id)}>🗑️ מחק</button>
      </div>
    )}

    {isMine && requests?.length > 0 && (
      <div className="request-section">
        <strong>בקשות להצטרפות:</strong>
        <ul>
          {requests.map((req) => (
            <li key={req._id}>
              {req.passenger_id.username} ביקש {req.seats_requested} מקומות - סטטוס: {req.status}
            </li>
          ))}
        </ul>
      </div>
    )}
  </div>
);

export default RideCard;
