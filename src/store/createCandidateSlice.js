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
      addresses: [],
      current_emails: [],
      direct_reports: undefined,
      dob: undefined,
      emails: [],
      highest_education: undefined,
      industry_years: undefined,
      management_years: undefined,
      martial_status: undefined,
      nationality: [],
      phones: [],
      prefer_position: { positions: [] },
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
  },
  extraReducers: {},
});

export const { putDataCandidateType } = createCandidateSlice.actions;

const { reducer } = createCandidateSlice;
export default reducer;
