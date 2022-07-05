import axios from 'axios';
import { getUserFromLocalStorage } from './localStorage';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
});

axiosInstance.interceptors.request.use((config) => {
  const user = getUserFromLocalStorage();
  if (user) {
    config.headers.common['Authorization'] = `Bearer ${user.token}`;
  }
  return config;
});

export default axiosInstance;
