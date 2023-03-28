import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getJobs } from '../apis/jobsApi';

export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async (params) =>
    await getJobs({
      params: {
        page: 1,
        perPage: 10,
        ...params,
      },
    }),
);

export const jobsSlice = createSlice({
  name: 'jobs',
  initialState: {
    isSuccess: false,
    loading: false,
    data: [],
    count: 0,
  },

  extraReducers: {
    [fetchJobs.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [fetchJobs.fulfilled]: (state, { payload }) => {
      state.data = payload.data;
      state.count = payload.count;
      state.loading = false;
      state.isSuccess = true;
    },
    [fetchJobs.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});

const { reducer } = jobsSlice;
export default reducer;
