import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import { getAllJobsThunk } from './allJobsThunk';

const initialState = {
  jobs: [],
  isLoading: false,
};

const getAllJobs = createAsyncThunk('allJobs/getJobs', getAllJobsThunk);

const allJobsSlice = createSlice({
  name: 'allJobs',
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: {
    [getAllJobs.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllJobs.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.jobs = payload.jobs;
    },
    [getAllJobs.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export const { showLoading, hideLoading } = allJobsSlice.actions;
export { getAllJobs };

export default allJobsSlice;
