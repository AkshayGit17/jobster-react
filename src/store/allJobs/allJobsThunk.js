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
