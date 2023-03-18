import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getDetailCandidate } from '../apis/candidatesApi';
import { putDetailCandidate } from '../apis/candidatesApi';
import { toast } from 'react-toastify';
import { putCandidateHistories } from '../apis/candidatesApi';
import { postCandidateHistories } from '../apis/candidatesApi';
import { deleteCandidateHistories } from '../apis/candidatesApi';

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

export const postDetailCandidateHistory = createAsyncThunk(
  'detailCandidates/postDetailCandidateHistory',
  postCandidateHistories,
);

export const putDetailCandidateHistory = createAsyncThunk(
  'detailCandidate/putDetailCandidateHistory',
  async ({ id, params }) => await putCandidateHistories(id, params),
);

export const detailCandidateSlice = createSlice({
  name: 'detailCandidate',
  initialState: {
    isSuccess: undefined,
    loading: false,
    isPutSuccess: false,
    isLoadingAcademic: false,
    data: [],
    user: {
      overview_text_new: undefined,
      first_name: undefined,
      middle_name: undefined,
      last_name: undefined,
      source: undefined,
      priority_status: undefined,
      relocating_willingness: 1,
      gender: undefined,
      martial_status: undefined,
      addresses: [],
      direct_reports: undefined,
      dob: undefined,
      emails: [],
      highest_education: undefined,
      industry_years: undefined,
      management_years: undefined,
      nationality: [],
      phones: [],
      prefer_position: { positions: [] },
      business_line: [],
    },
    history: [],
  },
  reducers: {
    putUserCandidateType: (state, { payload }) => {
      const { value, label } = payload;
      if (label in state.user) {
        state.user[label] = value;
      }
    },
    putUserCandidatePositions: (state, { payload }) => {
      state.user.prefer_position.positions = payload;
    },
    putUserCandidateEmail: (state, { payload }) => {
      state.user.emails = payload;
    },
    changeIsPutSuccess: (state) => {
      state.isPutSuccess = false;
    },
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
    },
    [fetchDetailCandidateSlice.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.loading = false;
      state.isSuccess = true;
      state.history = payload.histories;
      state.user.first_name = payload.first_name;
      state.user.middle_name = payload.middle_name;
      state.user.last_name = payload.last_name;
      state.user.source = payload.source;
      state.user.priority_status = payload.priority_status;
      state.user.relocating_willingness = payload.relocating_willingness;
      state.user.gender = payload.gender;
      state.user.martial_status = payload.martial_status;
      state.user.addresses = payload.addresses;
      state.user.direct_reports = payload?.direct_reports;
      state.user.dob = payload?.dob;
      state.user.emails = payload?.emails;
      state.user.highest_education = payload?.highest_education;
      state.user.industry_years = payload?.industry_years;
      state.user.management_years = payload?.management_years;
      state.user.nationality = payload?.nationality;
      state.user.phones = payload?.phones;
      state.user.prefer_position.positions = payload?.prefer_position.positions;
      state.user.overview_text_new = payload.overview_text_new;
      state.user.business_line = payload.business_line;
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
      state.user.first_name = payload.first_name;
      state.user.middle_name = payload.middle_name;
      state.user.last_name = payload.last_name;
      state.user.source = payload.source;
      state.user.priority_status = payload.priority_status;
      state.user.relocating_willingness = payload.relocating_willingness;
      state.user.gender = payload.gender;
      state.user.martial_status = payload.martial_status;
      state.user.addresses = payload.addresses;
      state.user.direct_reports = payload?.direct_reports;
      state.user.dob = payload?.dob;
      state.user.emails = payload?.emails;
      state.user.highest_education = payload?.highest_education;
      state.user.industry_years = payload?.industry_years;
      state.user.management_years = payload?.management_years;
      state.user.nationality = payload?.nationality;
      state.user.phones = payload?.phones;
      state.user.prefer_position.positions = payload?.prefer_position.positions;
      state.user.overview_text_new = payload.overview_text_new;
      state.user.business_line = payload.business_line;
    },

    [postDetailCandidateHistory.pending]: (state) => {
      state.isLoadingAcademic = true;
    },
    [postDetailCandidateHistory.fulfilled]: (state) => {
      state.isLoadingAcademic = false;
      toast.success('Create success!', {
        autoClose: 1000,
        position: 'top-right',
      });
    },
    [postDetailCandidateHistory.rejected]: (state) => {
      state.isLoadingAcademic = false;
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

export const {
  putUserCandidateType,
  putUserCandidatePositions,
  putUserCandidateEmail,
  changeIsPutSuccess,
  deleteHistory,
} = detailCandidateSlice.actions;

const { reducer } = detailCandidateSlice;
export default reducer;
