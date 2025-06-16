import './RequestList.css';

const RequestList = ({ requests }) => {
  if (!requests || requests.length === 0) return null;

  return (
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
  );
};

export default RequestList;
