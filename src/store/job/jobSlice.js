import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { getUserFromLocalStorage } from '../../utils/localStorage';
import { createJobThunk } from './jobThunk';

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
  },
  extraReducers: {
    [createJob.pending]: (state) => {
      state.isLoading = true;
    },
    [createJob.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      toast.success('job created');
    },
    [createJob.rejected]: (state, { payload }) => {
      state.isLoading = false;
      toast.error(payload);
    },
  },
});

export const { handleInputChange, clearValues } = jobSlice.actions;
export { createJob };

export default jobSlice;
