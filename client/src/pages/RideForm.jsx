import { useState, useContext, useEffect } from 'react';
import axios from '../services/axiosInstance';
import { AuthContext } from '../context/AuthContext';
// import CitySelect from './CitySelect';
import CitySelect from '../components/CitySelect';

import './RideForm.css';


const RideForm = ({ onClose, onRideAdded, initialRide = null }) => {
  const { user, token } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    from_city: '',
    from_address: '',
    destination_city: '',
    destination_address: '',
    departure_time: '',
    available_seats: '',
    notes: '',
    gender: 'נהג'
  });

  useEffect(() => {
    if (initialRide) {
      setFormData({
        from_city: initialRide.from_city || '',
        from_address: initialRide.from_address || '',
        destination_city: initialRide.destination_city || '',
        destination_address: initialRide.destination_address || '',
        departure_time: initialRide.departure_time?.slice(0, 16) || '',
        available_seats: initialRide.available_seats || '',
        notes: initialRide.notes || '',
        gender: initialRide.gender || 'נהג'
      });
    }
  }, [initialRide]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const rideData = {
        ...formData,
        driver_id: user._id,
        departure_time: new Date(formData.departure_time),
        available_seats: Number(formData.available_seats)
      };

      let res;
      if (initialRide) {
        res = await axios.put(`/api/rides/${initialRide._id}`, rideData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('✏️ הנסיעה עודכנה בהצלחה');
        if (onRideAdded) onRideAdded(res.data);
      } else {
        res = await axios.post('/api/rides', rideData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('✅ נסיעה נוצרה בהצלחה');
        if (onRideAdded) onRideAdded(res.data);
      }

      onClose();
    } catch (err) {
      console.error('שגיאה בשמירת נסיעה:', err.response?.data || err.message);
      alert(`שגיאה: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div>
      <h2>{initialRide ? '✏️ עריכת נסיעה' : 'פרסום נסיעה חדשה'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>עיר מוצא:</label>
          <CitySelect
            name="from_city"
            value={formData.from_city}
            onChange={handleChange}
            placeholder="בחר עיר מוצא"
          />
        </div>

        <div>
          <label>כתובת מוצא:</label>
          <input
            type="text"
            name="from_address"
            value={formData.from_address}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>עיר יעד:</label>
          <CitySelect
            name="destination_city"
            value={formData.destination_city}
            onChange={handleChange}
            placeholder="בחר עיר יעד"
          />
        </div>

        <div>
          <label>כתובת יעד:</label>
          <input
            type="text"
            name="destination_address"
            value={formData.destination_address}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>זמן יציאה:</label>
          <input
            type="datetime-local"
            name="departure_time"
            value={formData.departure_time}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>מקומות פנויים:</label>
          <input
            type="number"
            name="available_seats"
            value={formData.available_seats}
            min="1"
            max="20"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            style={{ width: '100%' }}
          >
            <option value="נהג">נהג</option>
            <option value="נהגת">נהגת</option>
          </select>
        </div>

        <div>
          <label>הערות:</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>

        <button type="submit">
          {initialRide ? 'עדכן נסיעה' : 'פרסם נסיעה'}
        </button>
      </form>
    </div>
  );
};

export default RideForm;
