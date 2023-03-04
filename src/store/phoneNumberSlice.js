import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPhoneNumber } from '../apis/filterApi';

export const fetchPhoneNumber = createAsyncThunk(
  'phoneNumber/fetchPhoneNumber',
  async () => await getPhoneNumber({}),
);

export const phoneNumberSlice = createSlice({
  name: 'phoneNumber',
  initialState: {
    isSuccess: undefined,
    loading: false,
    data: [],
  },
  reducers: {},
  extraReducers: {
    [fetchPhoneNumber.pending]: (state) => {
      state.loading = true;
    },
    [fetchPhoneNumber.fulfilled]: (state, { payload }) => {
      state.data = payload.data;
      state.loading = false;
      state.isSuccess = false;
    },
    [fetchPhoneNumber.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});

const { reducer } = phoneNumberSlice;
export default reducer;
