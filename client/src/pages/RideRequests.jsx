// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const RideRequests = ({ rideId }) => {
//   const [requests, setRequests] = useState([]);

//   useEffect(() => {
//     const fetch = async () => {
//       const res = await axios.get('/api/requests');
//       const rideRequests = res.data.filter(r => r.ride_id === rideId);
//       setRequests(rideRequests);
//     };
//     fetch();
//   }, [rideId]);

//   const handleStatusChange = async (id, status) => {
//     await axios.put(`/api/requests/${id}`, { status });
//     setRequests(prev => prev.map(r => r._id === id ? { ...r, status } : r));
//   };

//   return (
//     <div>
//       <h2>בקשות לנסיעה</h2>
//       {requests.map(r => (
//         <div key={r._id}>
//           <p>נוסע: {r.passenger_id}</p>
//           <p>סטטוס: {r.status}</p>
//           <button onClick={() => handleStatusChange(r._id, 'approved')}>אשר</button>
//           <button onClick={() => handleStatusChange(r._id, 'rejected')}>דחה</button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default RideRequests;
