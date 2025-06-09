import axios from './axiosInstance';

export const createRide = async (rideData) => {
  return await axios.post('/rides', rideData);
};

export const getRides = async () => {
  return await axios.get('/rides');
};
