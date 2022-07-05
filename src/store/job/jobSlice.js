import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getUserFromLocalStorage } from '../../utils/localStorage';
import { createJobThunk, deleteJobThunk, updateJobThunk } from './jobThunk';

const initialState = {
  company: '',
  position: '',
  status: 'pending',
  jobType: 'full-time',
  jobLocation: '',
  statusOptions: ['pending', 'interview', 'declined'],
  jobTypeOptions: ['full-time', 'part-time', 'internship', 'remote'],
  isEditing: false,
  editJobId: '',
  isLoading: false,
};

const createJob = createAsyncThunk('job/createJob', createJobThunk);
const deleteJob = createAsyncThunk('job/deleteJob', deleteJobThunk);
const updateJob = createAsyncThunk('job/updateJob', updateJobThunk);

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    handleInputChange: (state, { payload }) => {
      const { name, value } = payload;
      state[name] = value;
    },
    clearValues: () => {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || '',
      };
    },
    setEditJob: (state, { payload }) => {
      return {
        ...state,
        ...payload,
        isEditing: true,
      };
    },
  },
  extraReducers: {
    [createJob.pending]: (state) => {
      state.isLoading = true;
    },
    [createJob.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      toast.success('Success! job created');
    },
    [createJob.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
    [deleteJob.fulfilled]: (state, { payload }) => {
      toast.success(payload);
    },
    [deleteJob.rejected]: (state, { payload }) => {
      toast.error(payload);
    },
    [updateJob.pending]: (state) => {
      state.isLoading = true;
    },
    [updateJob.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      toast.success('success! job updated');
    },
    [updateJob.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export const { handleInputChange, clearValues, setEditJob } = jobSlice.actions;
export { createJob, deleteJob, updateJob };

export default jobSlice;
