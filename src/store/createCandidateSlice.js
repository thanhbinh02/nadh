import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const createCandidateSlice = createSlice({
  name: 'createCandidate',
  initialState: {
    isSuccess: undefined,
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
      positions: [],
      type: 3,
    },
  },
  reducers: {
    putDataCandidateType: (state, { payload }) => {
      const { value, label } = payload;
      if (label in state.data) {
        state.data[label] = value;
      }
    },
    putDataCandidateEmail: (state, { payload }) => {
      state.data.emails = payload;
    },
  },
  extraReducers: {},
});

export const { putDataCandidateType, putDataCandidateEmail } =
  createCandidateSlice.actions;

const { reducer } = createCandidateSlice;
export default reducer;
