import { useState, useContext, useEffect } from 'react';
import axios from '../services/axiosInstance';
import { AuthContext } from '../context/AuthContext';
import './RideForm.css';


const RideForm = ({ onClose, onRideAdded, initialRide = null }) => {
  const { user, token } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    from: '',
    to: '',
    departure_time: '',
    available_seats: '',
    notes: ''
  });

  useEffect(() => {
    if (initialRide) {
      setFormData({
        from: initialRide.from || '',
        to: initialRide.to || '',
        departure_time: initialRide.departure_time?.slice(0, 16) || '',
        available_seats: initialRide.available_seats || '',
        notes: initialRide.notes || ''
      });
    } else {
      // טופס חדש - אפס שדות
      setFormData({
        from: '',
        to: '',
        departure_time: '',
        available_seats: '',
        notes: ''
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
        // עריכה
        res = await axios.put(`/api/rides/${initialRide._id}`, rideData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('✏️ הנסיעה עודכנה בהצלחה');
        if (onRideAdded) onRideAdded(res.data); // מתפקד גם כעדכון
      } else {
        // יצירה
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
          <label>מוצא:</label>
          <input type="text" name="from" value={formData.from} onChange={handleChange} required />
        </div>

        <div>
          <label>יעד:</label>
          <input type="text" name="to" value={formData.to} onChange={handleChange} required />
        </div>

        <div>
          <label>זמן יציאה:</label>
          <input type="datetime-local" name="departure_time" value={formData.departure_time} onChange={handleChange} required />
        </div>

        <div>
          <label>מקומות פנויים:</label>
          <input type="number" name="available_seats" value={formData.available_seats} onChange={handleChange} required min="1" />
        </div>

        <div>
          <label>הערות:</label>
          <textarea name="notes" value={formData.notes} onChange={handleChange} />
        </div>

        <button type="submit">
          {initialRide ? 'עדכן נסיעה' : 'פרסם נסיעה'}
        </button>
      </form>
    </div>
  );
};

export default RideForm;
