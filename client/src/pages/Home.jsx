import { useEffect, useState, useContext } from 'react';
import axios from '../services/axiosInstance';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import RideSection from '../components/RideSection';
import RideFilterWrapper from '../components/RideFilterWrapper';
import NotificationsArea from '../components/NotificationsArea';
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
  const [notifications, setNotifications] = useState([]);
  const [visibleToasts, setVisibleToasts] = useState([]);
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const [filterParams, setFilterParams] = useState(null);
  const navigate = useNavigate();

  const now = new Date();

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
    }
  }, [user]);


  useEffect(() => {
    const fetchRides = async () => {
      try {
        const res = await axios.get('/rides');
        setAllRides(res.data);
      } catch (err) {
        console.error('שגיאה בשליפת נסיעות:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRides();
  }, []);

  const myRides = allRides.filter(
    ride => (ride.driver_id === user?._id || ride.driver_id?._id === user?._id) && new Date(ride.departure_time) > now
  );

  const otherRides = allRides.filter(
    ride => ride.driver_id?._id !== user?._id && new Date(ride.departure_time) > now
  );

  useEffect(() => {
    const fetchRequests = async () => {
      const all = await Promise.all(
        myRides.map(async (ride) => {
          const res = await axios.get(`/requests/byRide/${ride._id}`);
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

  const refreshNotifications = async () => {
    try {
      const res = await axios.get(`/notifications/byUser/${user?._id}`);
      setNotifications(res.data);
    } catch (err) {
      console.error('שגיאה בקבלת התראות', err);
    }
  };

  useEffect(() => {
    if (user?._id) {
      refreshNotifications();
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
        }, 10000);
      }
    });
  }, [notifications]);

  const handleMarkAsSeen = async (notificationId) => {
    try {
      await axios.patch(`/notifications/${notificationId}/read`);
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
      await axios.delete(`/rides/${rideId}`, {
        data: { userId: user._id }
      });
      setAllRides((prev) => prev.filter((ride) => ride._id !== rideId));
      setMessage('✅ הנסיעה נמחקה בהצלחה');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('שגיאה במחיקת נסיעה:', err);
      setMessage('❌ שגיאה במחיקת נסיעה');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const filteredRides = otherRides.filter((ride) => {
    if (!filterParams) return true;
    const { from_city, destination_city, genders, minSeats, date } = filterParams;
    return (
      (!from_city || ride.from_city === from_city) &&
      (!destination_city || ride.destination_city === destination_city) &&
      (!genders || genders.length === 0 || genders.includes(ride.gender)) &&
      (!minSeats || ride.available_seats >= parseInt(minSeats)) &&
      (!date || new Date(ride.departure_time).toISOString().split('T')[0] === date)
    );
  });

  const unreadCount = notifications.filter(n => !n.seen && !n.is_read).length;

  return (
    <div className="home-background">
      <div className="home-with-notifications">
        <NotificationsArea
          notifications={notifications}
          visibleToasts={visibleToasts}
          unreadCount={unreadCount}
          showAll={showAllNotifications}
          onToggleAll={() => setShowAllNotifications(prev => !prev)}
          onMarkAsSeen={handleMarkAsSeen}
          refreshNotifications={refreshNotifications}
        />

        <div className="container-flex">
          <RideFilterWrapper onFilter={setFilterParams} />

          <RideSection
            user={user}
            showMyRides={showMyRides}
            setShowMyRides={setShowMyRides}
            rides={allRides}
            myRides={myRides}
            filteredRides={filteredRides}
            requestsByRide={requestsByRide}
            loading={loading}
            showForm={showForm}
            setShowForm={setShowForm}
            rideToEdit={rideToEdit}
            setRideToEdit={setRideToEdit}
            onRideAdded={(newRide) => {
              if (rideToEdit) {
                setAllRides((prev) =>
                  prev.map(r => r._id === newRide._id ? newRide : r)
                );
              } else {
                setAllRides((prev) => [...prev, newRide]);
                setShowMyRides(true);
              }
              setShowForm(false);
              setRideToEdit(null);
            }}
            onDeleteRide={handleDeleteRide}
            navigate={navigate}
          />
        </div>
      </div>

      {message && (
        <div className="simple-toast">{message}</div>
      )}
    </div>
  );
};

export default Home;
