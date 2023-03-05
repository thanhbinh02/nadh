import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getJobFunctionsSkills } from '../apis/filterApi';

export const fetchJobFunctionsSkills = createAsyncThunk(
  'jobFunctionsSkills/fetchJobFunctionsSkills',
  async () => await getJobFunctionsSkills(),
);

export const jobFunctionsSkillsSlice = createSlice({
  name: 'jobFunctionsSkills',
  initialState: {
    loading: false,
    isSuccess: undefined,
    data: [],
  },
  reducers: {},
  extraReducers: {
    [fetchJobFunctionsSkills.pending]: (state) => {
      state.loading = true;
    },
    [fetchJobFunctionsSkills.fulfilled]: (state, { payload }) => {
      state.data = payload.data;
      state.loading = false;
      state.isSuccess = true;
    },
    [fetchJobFunctionsSkills.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});

const { reducer } = jobFunctionsSkillsSlice;
export default reducer;
