// import { useEffect, useState, useContext } from 'react';
// import axios from '../services/axiosInstance';
// import { AuthContext } from '../context/AuthContext';
// import RideForm from './RideForm';
// import RideList from '../components/RideList';
// import MessageBanner from '../components/MessageBanner';
// import LoadingIndicator from '../components/LoadingIndicator';
// import RideFilter from '../components/RideFilter'; // ✅ הוספה חדשה
// import { useNavigate } from 'react-router-dom';

// const Home = () => {
//   const { user } = useContext(AuthContext);
//   const [allRides, setAllRides] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showMyRides, setShowMyRides] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const [message, setMessage] = useState('');
//   const [rideToEdit, setRideToEdit] = useState(null);
//   const [requestsByRide, setRequestsByRide] = useState({});
//   const [filterParams, setFilterParams] = useState(null); // ✅ הוספה חדשה
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchRides = async () => {
//       try {
//         const res = await axios.get('/api/rides');
//         setAllRides(res.data);
//       } catch (err) {
//         console.error('שגיאה בשליפת נסיעות:', err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchRides();
//   }, []);

//   useEffect(() => {
//     const fetchRequests = async () => {
//       const all = await Promise.all(
//         myRides.map(async (ride) => {
//           const res = await axios.get(`/api/requests/byRide/${ride._id}`);
//           return { rideId: ride._id, requests: res.data };
//         })
//       );
//       const map = {};
//       all.forEach(entry => {
//         map[entry.rideId] = entry.requests;
//       });
//       setRequestsByRide(map);
//     };

//     if (showMyRides) {
//       fetchRequests();
//     }
//   }, [showMyRides, allRides]);

//   const handleDeleteRide = async (rideId) => {
//     try {
//       await axios.delete(`/api/rides/${rideId}`, {
//         data: { userId: user._id }
//       });
//       setAllRides((prev) => prev.filter((ride) => ride._id !== rideId));
//       setMessage('✅ הנסיעה נמחקה בהצלחה.');
//       setTimeout(() => setMessage(''), 3000);
//     } catch (err) {
//       console.error('שגיאה במחיקת נסיעה:', err);
//       setMessage('❌ שגיאה במחיקת נסיעה.');
//       setTimeout(() => setMessage(''), 3000);
//     }
//   };

//   const myRides = allRides.filter(ride => ride.driver_id?._id === user?._id);
//   const otherRides = allRides.filter(ride => ride.driver_id?._id !== user?._id);

//   // ✅ סינון נסיעות זמינות לפי הפילטרים שנבחרו
//   const filteredRides = otherRides.filter((ride) => {
//     if (!filterParams) return true;
//     const { from, to, gender, minSeats, date } = filterParams;
//     const driverGender = ride.driver_id?.gender;
//     return (
//       (!from || ride.from?.includes(from)) &&
//       (!to || ride.to?.includes(to)) &&
//       (!gender || driverGender === gender) &&
//       (!minSeats || ride.available_seats >= parseInt(minSeats)) &&
//       (!date || new Date(ride.departure_time).toISOString().split('T')[0] === date)
//     );
//   });

//   return (
//     <div className="home-background">
//       <div className="container" style={{ display: 'flex', alignItems: 'flex-start' }}> {/* ✅ שינוי לעטיפת תוכן ב-flex */}
//         <RideFilter onFilter={setFilterParams} /> {/* ✅ תיבת סינון בצד */}

//         <div style={{ flex: 1, marginRight: '2rem' }}> {/* תוכן עמוד */}
//           <h1>ברוך הבא{user ? `, ${user.username}` : ''}!</h1>
//           <p>מצא נסיעה שמתאימה לך או פרסם אחת חדשה.</p>

//           <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
//             <button className="btn btn-primary" onClick={() => {
//               setRideToEdit(null);
//               setShowForm(true);
//             }}>
//               + פרסם נסיעה חדשה
//             </button>

//             <button
//               onClick={() => setShowMyRides(prev => !prev)}
//               style={{ marginRight: '1rem' }}
//             >
//               {showMyRides ? 'הסתר את הנסיעות שלי' : 'הצג את הנסיעות שלי'}
//             </button>
//             <button
//               onClick={() => navigate('/my-joined-rides')}
//               style={{ marginRight: '1rem' }}
//             >
//               היסטוריית נסיעות שלי
//             </button>
//           </div>

//           <MessageBanner message={message} type={message.includes('❌') ? 'error' : 'success'} />

//           <hr />

//           {loading ? (
//             <LoadingIndicator />
//           ) : (
//             <>
//               {showMyRides && (
//                 <>
//                   <h2>הנסיעות שלי</h2>
//                   <RideList
//                     rides={myRides}
//                     isMine={true}
//                     onEdit={(ride) => {
//                       setRideToEdit(ride);
//                       setShowForm(true);
//                     }}
//                     onDelete={handleDeleteRide}
//                     requestsByRide={requestsByRide}
//                   />
//                   <hr />
//                 </>
//               )}

//               <h2>נסיעות זמינות</h2>
//               <RideList rides={filteredRides} /> {/* ✅ שימוש ברשימה מסוננת */}
//             </>
//           )}

//           {showForm && (
//             <div className="modal-overlay" onClick={() => setShowForm(false)}>
//               <div className="modal-content" onClick={e => e.stopPropagation()}>
//                 <button onClick={() => setShowForm(false)} style={{ float: 'left' }}>❌</button>
//                 <RideForm
//                   onClose={() => setShowForm(false)}
//                   initialRide={rideToEdit}
//                   onRideAdded={(newRide) => {
//                     if (rideToEdit) {
//                       setAllRides((prev) =>
//                         prev.map(r => r._id === newRide._id ? newRide : r)
//                       );
//                     } else {
//                       setAllRides((prev) => [...prev, newRide]);
//                     }
//                     setShowForm(false);
//                     setRideToEdit(null);
//                   }}
//                 />
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;


import { useEffect, useState, useContext } from 'react';
import axios from '../services/axiosInstance';
import { AuthContext } from '../context/AuthContext';
import RideForm from './RideForm';
import RideList from '../components/RideList';
import MessageBanner from '../components/MessageBanner';
import LoadingIndicator from '../components/LoadingIndicator';
import RideFilter from '../components/RideFilter';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const { user } = useContext(AuthContext);
  const [allRides, setAllRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMyRides, setShowMyRides] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState('');
  const [rideToEdit, setRideToEdit] = useState(null);
  const [requestsByRide, setRequestsByRide] = useState({});
  const [filterParams, setFilterParams] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const res = await axios.get('/api/rides');
        setAllRides(res.data);
      } catch (err) {
        console.error('שגיאה בשליפת נסיעות:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRides();
  }, []);

  useEffect(() => {
    const fetchRequests = async () => {
      const all = await Promise.all(
        myRides.map(async (ride) => {
          const res = await axios.get(`/api/requests/byRide/${ride._id}`);
          return { rideId: ride._id, requests: res.data };
        })
      );
      const map = {};
      all.forEach(entry => {
        map[entry.rideId] = entry.requests;
      });
      setRequestsByRide(map);
    };

    if (showMyRides) {
      fetchRequests();
    }
  }, [showMyRides, allRides]);

  const handleDeleteRide = async (rideId) => {
    try {
      await axios.delete(`/api/rides/${rideId}`, {
        data: { userId: user._id }
      });
      setAllRides((prev) => prev.filter((ride) => ride._id !== rideId));
      setMessage('✅ הנסיעה נמחקה בהצלחה.');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('שגיאה במחיקת נסיעה:', err);
      setMessage('❌ שגיאה במחיקת נסיעה.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const myRides = allRides.filter(ride => ride.driver_id?._id === user?._id);
  const otherRides = allRides.filter(ride => ride.driver_id?._id !== user?._id);

  const filteredRides = otherRides.filter((ride) => {
    if (!filterParams) return true;

    const {
      from_city,
      destination_city,
      genders,
      minSeats,
      date
    } = filterParams;

    return (
      (!from_city || ride.from_city === from_city) &&
      (!destination_city || ride.destination_city === destination_city) &&
      (!genders || genders.length === 0 || genders.includes(ride.gender)) &&
      (!minSeats || ride.available_seats >= parseInt(minSeats)) &&
      (!date || new Date(ride.departure_time).toISOString().split('T')[0] === date)
    );
  });

  return (
    <div className="home-background">
      <div className="container-flex">
        <RideFilter onFilter={setFilterParams} />
        <div className="main-content">
          <h1>ברוך הבא{user ? `, ${user.username}` : ''}!</h1>
          <p>מצא נסיעה שמתאימה לך או פרסם אחת חדשה.</p>

          <div className="button-group">
            <button className="btn btn-primary" onClick={() => {
              setRideToEdit(null);
              setShowForm(true);
            }}>
              + פרסם נסיעה חדשה
            </button>

            <button onClick={() => setShowMyRides(prev => !prev)}>
              {showMyRides ? 'הסתר את הנסיעות שלי' : 'הצג את הנסיעות שלי'}
            </button>

            <button onClick={() => navigate('/my-joined-rides')}>
              היסטוריית נסיעות שלי
            </button>
          </div>

          <MessageBanner message={message} type={message.includes('❌') ? 'error' : 'success'} />
          <hr />

          {loading ? (
            <LoadingIndicator />
          ) : (
            <>
              {showMyRides && (
                <>
                  <h2>הנסיעות שלי</h2>
                  <RideList
                    rides={myRides}
                    isMine={true}
                    onEdit={(ride) => {
                      setRideToEdit(ride);
                      setShowForm(true);
                    }}
                    onDelete={handleDeleteRide}
                    requestsByRide={requestsByRide}
                  />
                  <hr />
                </>
              )}

              <h2>נסיעות זמינות</h2>
              <RideList rides={filteredRides} />
            </>
          )}

          {showForm && (
            <div className="modal-overlay" onClick={() => setShowForm(false)}>
              <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button onClick={() => setShowForm(false)} style={{ float: 'left' }}>❌</button>
                <RideForm
                  onClose={() => setShowForm(false)}
                  initialRide={rideToEdit}
                  onRideAdded={(newRide) => {
                    if (rideToEdit) {
                      setAllRides((prev) =>
                        prev.map(r => r._id === newRide._id ? newRide : r)
                      );
                    } else {
                      setAllRides((prev) => [...prev, newRide]);
                    }
                    setShowForm(false);
                    setRideToEdit(null);
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
