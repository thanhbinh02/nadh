import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { putDetailCandidate } from '../apis/candidatesApi';
import { toast } from 'react-toastify';

export const putBusinessLineSlice = createAsyncThunk(
  'businessLine/putBusinessLineSlice',
  async ({ id, params }) => await putDetailCandidate(id, params),
);

export const businessLineSlice = createSlice({
  name: 'businessLine',
  initialState: {
    isSuccess: false,
    loading: false,
    data: [],
  },
  reducers: {},
  extraReducers: {
    [putBusinessLineSlice.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [putBusinessLineSlice.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload.business_line;
    },
  },
});

const { reducer } = businessLineSlice;
export default reducer;
