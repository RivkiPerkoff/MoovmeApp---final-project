import axios from './axiosInstance'; // אם באותה תיקייה

export const login = async (credentials) => {
  return await axios.post('/api/auth/login', credentials);
};

export const register = async (userData) => {
  return await axios.post('/api/auth/register', userData);
};

