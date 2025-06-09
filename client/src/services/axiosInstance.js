import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  // עם טוקן לא צריך withCredentials
});

// מוסיף את ה-Authorization header אם יש טוקן
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
