import axios from './axiosInstance'; // אם באותה תיקייה

export const register = async (userData) => {
  return await axios.post('/auth/register', userData);
};

export const login = async (credentials) => {
  return await axios.post('/auth/login', credentials);
};
