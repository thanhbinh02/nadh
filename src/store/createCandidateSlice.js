import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postCandidate } from '../apis/candidatesApi';
import { toast } from 'react-toastify';

export const postNewCandidate = createAsyncThunk(
  'createCandidate/postNewCandidate',
  async (params) => await postCandidate(params),
);

export const createCandidateSlice = createSlice({
  name: 'createCandidate',
  initialState: {
    isSuccess: 123,
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
    putDataCandidateType: (state, { payload }) => {
      const { value, label } = payload;
      if (label in state.data) {
        state.data[label] = value;
      }
    },
    putDataCandidatePositions: (state, { payload }) => {
      state.data.prefer_position.positions = payload;
    },
    putDataCandidateEmail: (state, { payload }) => {
      state.data.emails = payload;
    },
    putDataCandidateAddresses: (state, { payload }) => {
      state.data.addresses = payload;
    },
  },
  extraReducers: {
    extraReducers: {
      [postNewCandidate.pending]: (state) => {
        state.loading = true;
      },
      [postNewCandidate.fulfilled]: (state, { payload }) => {
        console.log('fulfilled');
        state.user = payload;
        state.loading = false;
        state.isSuccess = true;
        localStorage.setItem('candidateDetail', payload);
      },
      [postNewCandidate.rejected]: (state) => {
        console.log('rejected');
        state.loading = false;
        state.isSuccess = false;
      },
    },
  },
});

export const {
  putDataCandidateType,
  putDataCandidateEmail,
  putDataCandidateAddresses,
  putDataCandidatePositions,
} = createCandidateSlice.actions;

const { reducer } = createCandidateSlice;
export default reducer;
