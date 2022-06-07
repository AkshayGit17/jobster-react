import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  company: '',
  position: '',
  status: 'pending',
  jobType: 'full-time',
  jobLocation: 'my-city',
  statusOptions: ['pending', 'interview', 'declined'],
  jobTypeOptions: ['full-time', 'part-time', 'internship', 'remote'],
  isEditing: false,
  editJobId: '',
  isLoading: false,
};

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
      };
    },
  },
});

export const { handleInputChange, clearValues } = jobSlice.actions;

export default jobSlice;
