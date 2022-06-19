import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user/userSlice';
import jobSlice from './job/jobSlice';
import allJobsSlice from './allJobs/allJobsSlice';

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    job: jobSlice.reducer,
    allJobs: allJobsSlice.reducer,
  },
});

export default store;
