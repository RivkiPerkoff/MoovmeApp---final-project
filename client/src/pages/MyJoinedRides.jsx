import React, { useEffect, useState, useContext } from 'react';
import axios from '../services/axiosInstance';
import { AuthContext } from '../context/AuthContext';
import './MyJoinedRides.css';

const MyJoinedRides = () => {
    const { user } = useContext(AuthContext);
    const [requests, setRequests] = useState([]);

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

    const handleCancelRequest = async (requestId, rideId, seats) => {
        try {
            await axios.delete(`/api/requests/${requestId}`, {
                data: { userId: user._id }
            }); 
            await axios.put(`/api/rides/${rideId}/increaseSeats`, {
                seatsToAdd: seats,
            });

            setRequests(prev => prev.filter(r => r._id !== requestId));
        } catch (err) {
            console.error("שגיאה בביטול בקשה:", err);
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
                        <div key={req._id} className="ride-card">
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
                                    onClick={() => handleCancelRequest(req._id, ride._id, req.seats_requested)}
                                >
                                    בטל הצטרפות
                                </button>
                            )}
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default MyJoinedRides;
