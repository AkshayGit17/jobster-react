import axiosInstance from '../../utils/axiosInstance';
import { logoutUser } from '../user/userSlice';
import { clearValues } from './jobSlice';

export const createJobThunk = async (job, thunkAPI) => {
  try {
    const resp = await axiosInstance.post('/jobs', job, {
      headers: {
        Authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue('unauthorized!! logging out');
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
