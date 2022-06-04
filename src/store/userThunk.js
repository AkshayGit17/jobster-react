import axiosInstance from '../utils/axiosInstance';
import { logoutUser } from './userSlice';

export const registerUserThunk = async (user, thunkAPI) => {
  try {
    const resp = await axiosInstance.post('/auth/register', user);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const loginUserThunk = async (user, thunkAPI) => {
  try {
    const resp = await axiosInstance.post('/auth/login', user);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const updateUserThunk = async (user, thunkAPI) => {
  try {
    const resp = await axiosInstance.patch('/auth/updateUser', user, {
      headers: {
        Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });
    return resp.data;
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue('unauthorized! logging out');
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
