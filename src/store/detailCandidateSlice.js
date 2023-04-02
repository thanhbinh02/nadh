import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getDetailCandidate,
  putDetailCandidate,
  putCandidateHistories,
  postCandidateHistories,
  deleteCandidateHistories,
} from '../apis/candidatesApi';
import { toast } from 'react-toastify';
import { postComment } from '../apis/jobsApi';

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

export const postCommentInterview = createAsyncThunk(
  'detailCandidate/postCommentInterview',
  async (params) => await postComment(params),
);

const findFlow = (detailCandidate, dataFlow) => {
  const flows = detailCandidate?.flows?.find(
    (flow) => flow.job_id === dataFlow?.flowItem?.job_id,
  );
  const newFlow = flows?.flow?.find((item) => item.id === dataFlow?.item?.id);
  return newFlow;
};

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
    flows: [],
    dataFlow: {},
    idFlow: undefined,
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
    viewFlowDetail: (state, { payload }) => {
      state.dataFlow = payload;
      state.idFlow = payload?.item?.id;
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
      state.flows = payload.flows;
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
      state.flows = payload.flows;

      if (state.idFlow !== undefined) {
        state.dataFlow = {
          flowItem: payload?.flows?.find(
            (flow) => flow.job_id === state.dataFlow?.flowItem?.job_id,
          ),
          item: findFlow(state.data, state.dataFlow),
        };
      }
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

    [postCommentInterview.pending]: (state) => {
      state.isPutSuccess = false;
      toast.success('Add comment success!', {
        autoClose: 1000,
        position: 'top-right',
      });
    },
    [postCommentInterview.fulfilled]: (state, { payload }) => {
      state.isPutSuccess = true;
    },
  },
});

export const { deleteHistory, viewFlowDetail } = detailCandidateSlice.actions;

const { reducer } = detailCandidateSlice;
export default reducer;
