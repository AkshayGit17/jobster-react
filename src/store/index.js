import { configureStore } from '@reduxjs/toolkit';
import userSlice from './user/userSlice';
import jobSlice from './job/jobSlice';

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    job: jobSlice.reducer,
  },
});

export default store;
