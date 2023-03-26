import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getDetailCandidate,
  putDetailCandidate,
  putCandidateHistories,
  postCandidateHistories,
  deleteCandidateHistories,
} from '../apis/candidatesApi';
import { toast } from 'react-toastify';

export const fetchDetailCandidateSlice = createAsyncThunk(
  'detailCandidate/fetchDetailCandidateSlice',
  async (id) => await getDetailCandidate(id),
);

export const fetchDetailCandidateSliceNotLoading = createAsyncThunk(
  'detailCandidate/fetchDetailCandidateSliceNotLoading',
  async (id) => await getDetailCandidate(id),
);

export const putNewDetailCandidate = createAsyncThunk(
  'detailCandidate/putNewDetailCandidate',
  async ({ id, params }) => await putDetailCandidate(id, params),
);

export const putNewBusinessLineCandidate = createAsyncThunk(
  'detailCandidate/putNewDetailCandidate',
  async ({ id, params }) => await putDetailCandidate(id, params),
);

export const postDetailCandidateHistoryAcademic = createAsyncThunk(
  'detailCandidates/postDetailCandidateHistoryAcademic',
  postCandidateHistories,
);

export const postDetailCandidateHistoryCertificate = createAsyncThunk(
  'detailCandidates/postDetailCandidateHistoryCertificate',
  postCandidateHistories,
);

export const postDetailCandidateHistoryWorkingHistory = createAsyncThunk(
  'detailCandidates/postDetailCandidateHistoryWorkingHistory',
  postCandidateHistories,
);

export const putDetailCandidateHistory = createAsyncThunk(
  'detailCandidate/putDetailCandidateHistory',
  async ({ id, params }) => await putCandidateHistories(id, params),
);

export const detailCandidateSlice = createSlice({
  name: 'detailCandidate',
  initialState: {
    isSuccess: false,
    loading: false,
    isPutSuccess: false,
    isLoadingAcademic: false,
    isLoadingCertificate: false,
    isLoadingWorkingHistory: false,
    data: [],
    history: [],
  },
  reducers: {
    deleteHistory: (state, { payload }) => {
      state.history = state.history.filter((item) => item.id !== payload);
      deleteCandidateHistories(payload);
      toast.success('Delete success!', {
        autoClose: 1000,
        position: 'top-right',
      });
    },
  },
  extraReducers: {
    [fetchDetailCandidateSlice.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [fetchDetailCandidateSlice.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.loading = false;
      state.isSuccess = true;
      state.history = payload.histories;
    },
    [fetchDetailCandidateSlice.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
    [putNewDetailCandidate.pending]: (state) => {
      state.isPutSuccess = false;
    },
    [putNewDetailCandidate.fulfilled]: (state, { payload }) => {
      if (payload === undefined) {
        state.isPutSuccess = false;
      } else {
        state.isPutSuccess = true;
      }
    },
    [fetchDetailCandidateSliceNotLoading.fulfilled]: (state, { payload }) => {
      state.isLoadingAcademic = false;
      state.loading = false;
      state.data = payload;
      state.history = payload.histories;
    },

    [postDetailCandidateHistoryAcademic.pending]: (state) => {
      state.isLoadingAcademic = true;
    },
    [postDetailCandidateHistoryAcademic.fulfilled]: (state) => {
      state.isLoadingAcademic = false;
      toast.success('Create success!', {
        autoClose: 1000,
        position: 'top-right',
      });
    },
    [postDetailCandidateHistoryAcademic.rejected]: (state) => {
      state.isLoadingAcademic = false;
      toast.error('Create error!', {
        autoClose: 1000,
        position: 'top-right',
      });
    },

    [postDetailCandidateHistoryCertificate.pending]: (state) => {
      state.isLoadingCertificate = true;
    },
    [postDetailCandidateHistoryCertificate.fulfilled]: (state) => {
      state.isLoadingCertificate = false;
      toast.success('Create success!', {
        autoClose: 1000,
        position: 'top-right',
      });
    },
    [postDetailCandidateHistoryCertificate.rejected]: (state) => {
      state.isLoadingCertificate = false;
      toast.error('Create error!', {
        autoClose: 1000,
        position: 'top-right',
      });
    },

    [postDetailCandidateHistoryWorkingHistory.pending]: (state) => {
      state.isLoadingWorkingHistory = true;
    },
    [postDetailCandidateHistoryWorkingHistory.fulfilled]: (state) => {
      state.isLoadingWorkingHistory = false;
      toast.success('Create success!', {
        autoClose: 1000,
        position: 'top-right',
      });
    },
    [postDetailCandidateHistoryWorkingHistory.rejected]: (state) => {
      state.isLoadingWorkingHistory = false;
      toast.error('Create error!', {
        autoClose: 1000,
        position: 'top-right',
      });
    },

    [putDetailCandidateHistory.pending]: (state) => {
      state.isLoadingAcademic = true;
    },
    [putDetailCandidateHistory.fulfilled]: (state) => {
      state.isLoadingAcademic = false;
      toast.success('Update success!', {
        autoClose: 1000,
        position: 'top-right',
      });
    },
    [putDetailCandidateHistory.rejected]: (state) => {
      state.isLoadingAcademic = false;
      toast.error('Update failed!', {
        autoClose: 1000,
        position: 'top-right',
      });
    },
  },
});

export const { deleteHistory } = detailCandidateSlice.actions;

const { reducer } = detailCandidateSlice;
export default reducer;
