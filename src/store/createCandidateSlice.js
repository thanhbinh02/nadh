import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postCandidate } from '../apis/candidatesApi';

export const postNewCandidate = createAsyncThunk(
  'createCandidate/postNewCandidate',
  async (params) => await postCandidate(params),
);

export const createCandidateSlice = createSlice({
  name: 'createCandidate',
  initialState: {
    postCandidateSuccess: false,
    postCandidateLoading: false,
    loading: false,
    data: {
      first_name: undefined,
      middle_name: undefined,
      last_name: undefined,
      source: undefined,
      priority_status: undefined,
      relocating_willingness: 1,
      gender: undefined,
      martial_status: undefined,
      addresses: [],
      current_emails: [],
      direct_reports: undefined,
      dob: undefined,
      emails: [],
      highest_education: undefined,
      industry_years: undefined,
      management_years: undefined,
      nationality: [],
      phones: [],
      prefer_position: { positions: [] },
      type: 3,
    },
    user: [],
  },
  reducers: {
    removeUserNewCandidate: (state) => {
      state.user = [];
      state.postCandidateSuccess = false;
    },
  },
  extraReducers: {
    [postNewCandidate.pending]: (state) => {
      state.postCandidateLoading = true;
    },
    [postNewCandidate.fulfilled]: (state, { payload }) => {
      if (payload !== undefined) {
        state.user = payload;
        state.postCandidateLoading = false;
        state.postCandidateSuccess = true;
      }
    },
    [postNewCandidate.rejected]: (state, { payload }) => {
      state.user = [];
      state.postCandidateLoading = false;
      state.postCandidateSuccess = false;
    },
  },
});

export const { removeUserNewCandidate } = createCandidateSlice.actions;

const { reducer } = createCandidateSlice;
export default reducer;
