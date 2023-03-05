import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getSoftSkills } from '../apis/filterApi';

export const fetchSoftSkills = createAsyncThunk(
  'softSkills/fetchSoftSkills',
  async () =>
    await getSoftSkills({
      params: {
        property_name: 'soft_skills',
      },
    }),
);

export const softSkillsSlice = createSlice({
  name: 'softSkills',
  initialState: {
    loading: false,
    isSuccess: undefined,
    data: [],
  },
  reducers: {},
  extraReducers: {
    [fetchSoftSkills.pending]: (state) => {
      state.loading = true;
    },
    [fetchSoftSkills.fulfilled]: (state, { payload }) => {
      state.data = payload.data;
      state.loading = false;
      state.isSuccess = true;
    },
    [fetchSoftSkills.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});

const { reducer } = softSkillsSlice;
export default reducer;
