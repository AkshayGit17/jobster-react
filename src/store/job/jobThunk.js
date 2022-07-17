import axiosInstance, {
  checkForUnauthorizedResponse,
} from '../../utils/axiosInstance';
import { clearValues } from './jobSlice';
import { showLoading, hideLoading, getAllJobs } from '../allJobs/allJobsSlice';
// import authHeader from '../../utils/authHeader';

export const createJobThunk = async (job, thunkAPI) => {
  try {
    const resp = await axiosInstance.post('/jobs', job);
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
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
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const updateJobThunk = async ({ jobId, job }, thunkAPI) => {
  try {
    const resp = await axiosInstance.patch(`/jobs/${jobId}`, job);
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
