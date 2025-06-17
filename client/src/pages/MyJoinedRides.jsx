import React, { useEffect, useState, useContext } from 'react';
import axios from '../services/axiosInstance';
import { AuthContext } from '../context/AuthContext';
import './MyJoinedRides.css';

const MyJoinedRides = () => {
    const { user } = useContext(AuthContext);
    const [requests, setRequests] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const [cancelData, setCancelData] = useState(null);

    useEffect(() => {
        const fetchJoinedRides = async () => {
            try {
                const res = await axios.get(`/api/requests/byPassenger/${user._id}`);
                setRequests(res.data);
            } catch (err) {
                console.error("שגיאה בשליפת הנסיעות שהצטרפתי אליהן:", err);
            }
        };

        if (user?._id) {
            fetchJoinedRides();
        }
    }, [user]);

    const confirmCancel = (requestId, rideId, seatsRequested) => {
        setCancelData({ requestId, rideId, seatsRequested });
        setShowConfirm(true);
    };

const handleCancelRequest = async () => {
    if (!cancelData) return;
    const { requestId, rideId, seatsRequested } = cancelData;

    try {
        await axios.delete(`/api/requests/${requestId}`);
        await axios.put(`/api/requests/${rideId}/increaseSeats`, {
            seatsToAdd: seatsRequested
        });
        setRequests(prev => prev.filter(r => r._id !== requestId));
        setShowConfirm(false); // סגירת המודאל לאחר הצלחה
    } catch (error) {
        console.error("שגיאה בביטול הבקשה", error);
    }
};




    return (
        <div className="joined-rides-container">
            <h2>הנסיעות שהצטרפתי אליהן</h2>
            {requests.length === 0 ? (
                <p>לא הצטרפת עדיין לנסיעות</p>
            ) : (
                requests.map((req) => {
                    const ride = req.ride;
                    const isFutureRide = new Date(ride?.departure_time) > new Date();

                    return (
                        <React.Fragment key={req._id}>
                            <div className="ride-card">
                                <h3>מ: {ride?.from} ל: {ride?.to}</h3>
                                <p><span className="info-bold">תאריך:</span> {new Date(ride?.departure_time).toLocaleString()}</p>
                                <p><span className="info-bold">מקומות שתפסת:</span> {req.seats_requested}</p>
                                <p><span className="info-bold">הערות:</span> {ride?.notes || 'אין הערות'}</p>
                                {ride?.car_img && (
                                    <img src={ride.car_img} alt="תמונה של הרכב" />
                                )}

                                {isFutureRide && (
                                    <button
                                        className="btn-cancel"
                                        onClick={() => confirmCancel(req._id, ride._id, req.seats_requested)}
                                    >
                                        בטל הצטרפות
                                    </button>
                                )}
                            </div>

                            {showConfirm && cancelData?.requestId === req._id && (
                                <div className="modal-overlay">
                                    <div className="modal-content">
                                        <p>האם אתה בטוח שברצונך לבטל את ההצטרפות?</p>
                                        <div className="modal-buttons">
                                            <button onClick={() => handleCancelRequest()} className="btn-confirm">כן, בטל</button>
                                            <button onClick={() => setShowConfirm(false)} className="btn-cancel">ביטול</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </React.Fragment>
                    );
                })
            )}
        </div>
    );


};

export default MyJoinedRides;
