import axios from 'axios';



const axiosInstance = axios.create({
  baseURL: 'https://moovmeapp-backend.onrender.com/api',
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
