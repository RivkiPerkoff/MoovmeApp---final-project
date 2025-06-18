import axios from './axiosInstance';

export const login = async (credentials) => {
  return await axios.post('/auth/login', credentials);
};

export const register = async (userData) => {
  return await axios.post('/auth/register', userData);
};

