import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getSoftSkills } from '../apis/filterApi';
import { putCandidateInDetailPage } from '../apis/candidatesApi';
import { toast } from 'react-toastify';

export const fetchSoftSkills = createAsyncThunk(
  'softSkills/fetchSoftSkills',
  async () =>
    await getSoftSkills({
      params: {
        property_name: 'soft_skills',
      },
    }),
);

export const putSoftSkillsCandidate = createAsyncThunk(
  'softSkills/putSoftSkillsCandidate ',
  async ({ id, params }) => await putCandidateInDetailPage(id, params),
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
    [putSoftSkillsCandidate.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      toast.success('Successfully updated', {
        autoClose: 1000,
        position: 'top-right',
      });
    },
    [putSoftSkillsCandidate.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
      toast.success('Update failed', {
        autoClose: 1000,
        position: 'top-right',
      });
    },
  },
});

const { reducer } = softSkillsSlice;
export default reducer;
