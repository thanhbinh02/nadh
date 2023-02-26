import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { loginAuth } from '../apis/loginApi';

export const postLoginAuth = createAsyncThunk(
  'auth/postLoginAuth',
  async ({ username, password }) => await loginAuth(username, password),
);

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isSuccess: undefined,
    loading: false,
    token: localStorage.getItem('token') || undefined,
    user_sent: localStorage.getItem('user_sent') || undefined,
  },
  reducers: {
    logoutAuth: (state) => {
      state.token = undefined;
      state.user_sent = undefined;
      state.isSuccess = false;
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('user_sent');
    },
  },
  extraReducers: {
    [postLoginAuth.pending]: (state) => {
      state.loading = true;
    },
    [postLoginAuth.fulfilled]: (state, { payload }) => {
      localStorage.setItem('token', payload.token);
      localStorage.setItem('user_sent', JSON.stringify(payload.user_sent));
      state.token = payload.token;
      state.user_sent = payload.user_sent;
      state.loading = false;
      state.isSuccess = true;
    },
    [postLoginAuth.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});

export const { logoutAuth } = authSlice.actions;

const { reducer } = authSlice;
export default reducer;
