import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postJob } from '../apis/jobsApi';

export const postNewJob = createAsyncThunk(
  'createJob/postNewJob',
  async (params) => await postJob(params),
);

export const createJobSlice = createSlice({
  name: 'createJob',
  initialState: {
    isSuccessCreateJob: false,
    loading: false,
    newJob: [],
  },
  extraReducers: {
    [postNewJob.pending]: (state) => {
      state.loading = true;
    },
    [postNewJob.fulfilled]: (state, { payload }) => {
      if (payload !== undefined) {
        state.newJob = payload;
        state.loading = false;
        state.isSuccessCreateJob = true;
      }
    },
    [postNewJob.rejected]: (state) => {
      state.newJob = [];
      state.loading = false;
      state.isSuccessCreateJob = false;
    },
  },
});

const { reducer } = createJobSlice;
export default reducer;
