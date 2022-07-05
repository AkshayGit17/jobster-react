import axiosInstance from '../../utils/axiosInstance';
import { logoutUser } from '../user/userSlice';
import { clearValues } from './jobSlice';
import { showLoading, hideLoading, getAllJobs } from '../allJobs/allJobsSlice';
// import authHeader from '../../utils/authHeader';

export const createJobThunk = async (job, thunkAPI) => {
  try {
    const resp = await axiosInstance.post('/jobs', job);
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

export const deleteJobThunk = async (jobId, thunkAPI) => {
  try {
    thunkAPI.dispatch(showLoading());
    const resp = await axiosInstance.delete(`/jobs/${jobId}`);
    thunkAPI.dispatch(getAllJobs());
    return resp.data.msg;
  } catch (error) {
    thunkAPI.dispatch(hideLoading());
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue('unauthorized!! logging out');
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const updateJobThunk = async ({ jobId, job }, thunkAPI) => {
  try {
    const resp = await axiosInstance.patch(`/jobs/${jobId}`, job);
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
