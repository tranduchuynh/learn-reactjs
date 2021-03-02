import userApi from "api/userApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const register = createAsyncThunk('user/register', async (payload) => {
  const data = await userApi.register(payload);

  // save data to local storage
  localStorage.setItem('access_token', data.jwt);
  localStorage.setItem('user', JSON.stringify(data.user));

  return data.user
})

const counterSlice = createSlice({
  name: 'user',
  initialState: {
    current: {},
    settings: {},
  },
  reducers: {},
  extraReducer: {
    [register.fulfilled]: (state, action) => {
      state.current = action.payload
    }
  }
});

const { reducer } = counterSlice;
export default reducer;