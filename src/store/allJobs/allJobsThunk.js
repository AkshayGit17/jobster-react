import axiosInstance, {
  checkForUnauthorizedResponse,
} from '../../utils/axiosInstance';

export const getAllJobsThunk = async (_, thunkAPI) => {
  const { page, search, searchStatus, searchType, sort } =
    thunkAPI.getState().allJobs;

  let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;

  if (search) {
    url = url + `&search=${search}`;
  }

  try {
    const resp = await axiosInstance.get(url);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const getStatsThunk = async (_, thunkAPI) => {
  try {
    const resp = await axiosInstance.get('/jobs/stats');
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
