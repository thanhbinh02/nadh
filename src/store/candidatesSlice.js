import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCandidates } from '../apis/candidatesApi';
import { putDetailCandidate } from '../apis/candidatesApi';
import { toast } from 'react-toastify';

export const fetchCandidates = createAsyncThunk(
  'candidates/fetchCandidates',
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
  'candidates/refreshCandidates',
  async (params) =>
    await getCandidates({
      params: {
        page: 1,
        perPage: 10,
        ...params,
      },
    }),
);

export const putNewDetailCandidate = createAsyncThunk(
  'candidates/putNewDetailCandidate',
  async ({ id, params }) => await putDetailCandidate(id, params),
);

export const putIndustryDetailCandidate = createAsyncThunk(
  'candidates/putIndustryDetailCandidate',
  async ({ id, params }) => await putDetailCandidate(id, params),
);

export const candidatesSlice = createSlice({
  name: 'candidates',
  initialState: {
    isSuccess: false,
    loading: false,
    data: undefined,
    count: 0,
    businessLine: undefined,
  },
  reducers: {},
  extraReducers: {
    [fetchCandidates.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
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
      state.isSuccess = false;
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
    [putNewDetailCandidate.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [putNewDetailCandidate.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
    },
    [putNewDetailCandidate.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
    [putIndustryDetailCandidate.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [putIndustryDetailCandidate.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      toast.success('Successfully updated', {
        autoClose: 1000,
        position: 'top-right',
      });
    },
  },
});

const { reducer } = candidatesSlice;
export default reducer;
