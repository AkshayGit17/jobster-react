import axios from 'axios';
import { clearStore } from '../store/user/userSlice';
import { getUserFromLocalStorage } from './localStorage';

const axiosInstance = axios.create({
  baseURL: 'https://jobify-prod.herokuapp.com/api/v1/toolkit',
});

axiosInstance.interceptors.request.use((config) => {
  const user = getUserFromLocalStorage();
  if (user) {
    config.headers.common['Authorization'] = `Bearer${user.token}`;
  }
  return config;
});

export const checkForUnauthorizedResponse = (error, thunkAPI) => {
  if (error.response.status === 401) {
    thunkAPI.dispatch(clearStore());
    return thunkAPI.rejectWithValue('unauthorized! logging out');
  }
  return thunkAPI.rejectWithValue(error.response.data.msg);
};

export default axiosInstance;
