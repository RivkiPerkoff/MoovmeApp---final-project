import { useEffect, useState, useContext } from 'react';
import axios from '../services/axiosInstance';
import { AuthContext } from '../context/AuthContext';
import RideForm from './RideForm';
import RideList from '../components/RideList';
import MessageBanner from '../components/MessageBanner';
import LoadingIndicator from '../components/LoadingIndicator';
import NotificationsPanel from '../components/NotificationsPanel'; // או הנתיב שבו תשימי את הקובץ
import { useNavigate } from 'react-router-dom';
import './Home.css'

const Home = () => {
  const { user } = useContext(AuthContext);
  const [allRides, setAllRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMyRides, setShowMyRides] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState('');
  const [rideToEdit, setRideToEdit] = useState(null);
  const [requestsByRide, setRequestsByRide] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [visibleToasts, setVisibleToasts] = useState([]);
  const unreadCount = notifications.filter(n => !n.seen && !n.is_read).length;
  const [showAllNotifications, setShowAllNotifications] = useState(false);

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

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        console.log('USER:', user);
        console.log('USER._id:', user?._id);

        const res = await axios.get(`/api/notifications/byUser/${user?._id}`);
        setNotifications(res.data);
      } catch (err) {
        console.error('שגיאה בקבלת התראות', err);
      }
    };

    if (user?._id) {
      fetchNotifications();
    }
  }, [user?._id]);

  useEffect(() => {
    const unread = notifications.filter(n => !n.seen && !n.is_read);

    unread.forEach((notif) => {
      const alreadyVisible = visibleToasts.find(t => t._id === notif._id);
      if (!alreadyVisible) {
        setVisibleToasts(prev => [...prev, notif]);

        setTimeout(() => {
          setVisibleToasts(prev => prev.filter(t => t._id !== notif._id));
        }, 10000); // נעלם אחרי 10 שניות
      }
    });
  }, [notifications]);


  const handleMarkAsSeen = async (notificationId) => {
    try {
      await axios.patch(`/api/notifications/${notificationId}/read`);
      setNotifications(prev =>
        prev.map(n => n._id === notificationId ? { ...n, seen: true } : n)
      );
      setVisibleToasts(prev => prev.filter(t => t._id !== notificationId));
    } catch (err) {
      console.error('שגיאה בסימון ההתראה כנצפתה', err);
    }
  };

  const handleDeleteRide = async (rideId) => {
    try {
      await axios.delete(`/api/rides/${rideId}`, {
        data: { userId: user._id } // שליחת userId ב-body
      });
      setAllRides((prev) => prev.filter((ride) => ride._id !== rideId));
      setMessage('✅ הנסיעה נמחקה בהצלחה.');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('שגיאה במחיקת נסיעה:', err);
      if (err.response) {
        // שרת החזיר תשובה עם קוד שגיאה
        console.error('Response data:', err.response.data);
        console.error('Response status:', err.response.status);
        console.error('Response headers:', err.response.headers);
      } else if (err.request) {
        // הבקשה נשלחה אך לא התקבלה תשובה
        console.error('Request:', err.request);
      } else {
        // שגיאה בהגדרת הבקשה
        console.error('Error message:', err.message);
      }

      setMessage('❌ שגיאה במחיקת נסיעה.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const now = new Date();

  const myRides = allRides.filter(
    ride => ride.driver_id?._id === user?._id && new Date(ride.departure_time) > now
  );

  const otherRides = allRides.filter(
    ride => ride.driver_id?._id !== user?._id && new Date(ride.departure_time) > now
  );

  return (
    <div className="home-background">
      <div className="home-with-notifications">
        <div className="notification-bell" onClick={() => setShowAllNotifications(prev => !prev)}>
          🔔
          {unreadCount > 0 && <span className="notification-count">{unreadCount}</span>}
        </div>

        <NotificationsPanel
          notifications={notifications}
          visibleToasts={visibleToasts}
          showAll={showAllNotifications}
          onMarkAsSeen={handleMarkAsSeen}
          refreshNotifications={() => {
            axios.get(`/api/notifications/byUser/${user._id}`).then(res => setNotifications(res.data));
            axios.get('/api/rides').then(res => setAllRides(res.data)); // ← זה שורה חדשה
          }}

        />


        <div className="container">
          <h1>ברוך הבא{user ? `, ${user.username}` : ''}!</h1>
          <p>מצא נסיעה שמתאימה לך או פרסם אחת חדשה.</p>

          <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
            <button className="btn btn-primary" onClick={() => {
              setRideToEdit(null);
              setShowForm(true);
            }}>
              + פרסם נסיעה חדשה
            </button>

            <button
              onClick={() => setShowMyRides(prev => !prev)}
              style={{ marginRight: '1rem' }}
            >
              {showMyRides ? 'הסתר את הנסיעות שלי' : 'הצג את הנסיעות שלי'}
            </button>
            <button
              onClick={() => navigate('/my-joined-rides')}
              style={{ marginRight: '1rem' }}
            >
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
              <RideList rides={otherRides} />
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
