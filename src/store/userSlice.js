import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../utils/axiosInstance';

const initialState = {
  isLoading: false,
  user: null,
};

const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user, thunkAPI) => {
    try {
      const resp = await axiosInstance.post('/auth/register', user);
      console.log(resp);
    } catch (error) {
      console.log(error.response);
    }
  }
);
const loginUser = createAsyncThunk('user/loginUser', async (user, thunkAPI) => {
  console.log(`Login user: ${JSON.stringify(user)}`);
});

const userSlice = createSlice({
  name: 'user',
  initialState,
});

export { registerUser, loginUser };
export default userSlice;
