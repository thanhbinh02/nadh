import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getDetailJob } from '../apis/jobsApi';
import { putDetailJob } from '../apis/jobsApi';
import { putDetailJobExtend } from '../apis/jobsApi';
import { postComment } from '../apis/jobsApi';
import { postCandidateFlows } from '../apis/jobsApi';

export const fetchDetailJob = createAsyncThunk(
  'detailJob/fetchDetailJob',
  async (id) => await getDetailJob(id),
);

export const fetchDetailJobNotLoading = createAsyncThunk(
  'detailJob/fetchDetailJobNotLoading',
  async (id) => await getDetailJob(id),
);

export const putNewDetailJob = createAsyncThunk(
  'detailJob/putNewDetailJob',
  async ({ id, params }) => await putDetailJob(id, params),
);

export const putNewDetailJobExtend = createAsyncThunk(
  'detailJob/putNewDetailJobExtend',
  async ({ id, params }) => await putDetailJobExtend(id, params),
);

export const postCommentJob = createAsyncThunk(
  'detailJob/postCommentJob',
  async (params) => await postComment(params),
);

export const postCandidateFlowsJob = createAsyncThunk(
  'detailJob/postCandidateFlowsJob',
  async (params) => await postCandidateFlows(params),
);

export const detailJobSlice = createSlice({
  name: 'detailJob',
  initialState: {
    isSuccess: false,
    loading: false,
    data: [],
    isPutSuccess: false,
    candidate_flows: {},
  },
  reducers: {},
  extraReducers: {
    [fetchDetailJob.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [fetchDetailJob.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.loading = false;
      state.isSuccess = true;
      state.candidate_flows = payload.candidate_flows;
    },
    [putNewDetailJob.pending]: (state) => {
      state.isPutSuccess = false;
    },
    [putNewDetailJob.fulfilled]: (state, { payload }) => {
      if (payload === undefined) {
        state.data = payload;
        state.isPutSuccess = false;
      } else {
        state.isPutSuccess = true;
      }
    },
    [putNewDetailJobExtend.pending]: (state) => {
      state.isPutSuccess = false;
    },
    [putNewDetailJobExtend.fulfilled]: (state, { payload }) => {
      if (payload === undefined) {
        state.isPutSuccess = false;
      } else {
        state.isPutSuccess = true;
      }
    },
    [fetchDetailJob.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
    [fetchDetailJobNotLoading.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.candidate_flows = payload.candidate_flows;
    },

    [postCommentJob.pending]: (state) => {
      state.isPutSuccess = false;
    },
    [postCommentJob.fulfilled]: (state, { payload }) => {
      state.isPutSuccess = true;
    },

    [postCandidateFlowsJob.pending]: (state) => {
      state.isPutSuccess = false;
    },
    [postCandidateFlowsJob.fulfilled]: (state, { payload }) => {
      state.isPutSuccess = true;
    },
  },
});

const { reducer } = detailJobSlice;
export default reducer;
