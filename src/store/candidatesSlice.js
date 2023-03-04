import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCandidates } from '../apis/candidatesApi';

export const fetchCandidates = createAsyncThunk(
  'category/fetchCandidates',
  async (params) =>
    await getCandidates({
      params: {
        page: 1,
        perPage: 10,
        ...params,
      },
    }),
);

export const refreshCandidates = createAsyncThunk(
  'category/refreshCandidates',
  async () =>
    await getCandidates({
      params: {
        page: 1,
        perPage: 10,
      },
    }),
);

export const candidatesSlice = createSlice({
  name: 'candidates',
  initialState: {
    isSuccess: undefined,
    loading: false,
    data: undefined,
    count: 0,
  },
  reducers: {},
  extraReducers: {
    [fetchCandidates.pending]: (state) => {
      state.loading = true;
    },
    [fetchCandidates.fulfilled]: (state, { payload }) => {
      state.data = payload.data;
      state.count = payload.count;
      state.loading = false;
      state.isSuccess = true;
    },
    [fetchCandidates.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
    [refreshCandidates.pending]: (state) => {
      state.loading = true;
    },
    [refreshCandidates.fulfilled]: (state, { payload }) => {
      state.data = payload.data;
      state.count = payload.count;
      state.loading = false;
      state.isSuccess = true;
    },
    [refreshCandidates.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});

const { reducer } = candidatesSlice;
export default reducer;
