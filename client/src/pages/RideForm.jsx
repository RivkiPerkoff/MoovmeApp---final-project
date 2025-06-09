import { useState, useContext } from 'react';
import axios from '../services/axiosInstance';
import { AuthContext } from '../context/AuthContext';

const RideForm = ({ onClose }) => {
    const { user, token } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        from: '',
        to: '',
        departure_time: '',
        available_seats: '',
        notes: ''
    });

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
                departure_time: new Date(formData.departure_time), // המרה לתאריך אמיתי
                available_seats: Number(formData.available_seats)   // המרה למספר
            };

            console.log('שולח לשרת:', rideData);

            await axios.post('/api/rides', rideData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert('✅ נסיעה נוצרה בהצלחה');
            onClose();
        } catch (err) {
            console.error('שגיאה ביצירת נסיעה:', err.response?.data || err.message);
            alert(`שגיאה ביצירת נסיעה: ${err.response?.data?.message || err.message}`);
        }
    };

    return (
        <div>
            <h2>פרסום נסיעה חדשה</h2>
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

                <button type="submit">פרסם נסיעה</button>
            </form>
        </div>
    );
};

export default RideForm;
