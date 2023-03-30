import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { putDetailCandidate } from '../apis/candidatesApi';
import { putDetailClient } from '../apis/clientsApi';
import { putDetailJob } from '../apis/jobsApi';

export const putBusinessLineCandidateSlice = createAsyncThunk(
  'businessLine/putBusinessLineCandidateSlice',
  async ({ id, params }) => await putDetailCandidate(id, params),
);

export const putBusinessLineClientSlice = createAsyncThunk(
  'businessLine/putBusinessLineCandidateSlice',
  async ({ id, params }) => await putDetailClient(id, params),
);

export const putBusinessLineJobsSlice = createAsyncThunk(
  'businessLine/putBusinessLineJobsSlice',
  async ({ id, params }) => await putDetailJob(id, params),
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
    [putBusinessLineCandidateSlice.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [putBusinessLineCandidateSlice.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload.business_line;
    },
    [putBusinessLineJobsSlice.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [putBusinessLineJobsSlice.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      console.log('payload', payload);
      state.data = payload.business_line;
    },
  },
});

const { reducer } = businessLineSlice;
export default reducer;
