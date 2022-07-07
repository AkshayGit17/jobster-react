import axiosInstance from '../../utils/axiosInstance';

export const getAllJobsThunk = async (_, thunkAPI) => {
  let url = '/jobs';

  try {
    const resp = await axiosInstance.get(url);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const getStatsThunk = async (_, thunkAPI) => {
  try {
    const resp = await axiosInstance.get('/jobs/stats');
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
