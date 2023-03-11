import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getDetailCandidate } from '../apis/candidatesApi';

export const fetchDetailCandidateLocalSlice = createAsyncThunk(
  'detailCandidateLocal/fetchDetailCandidateSlice',
  async (id) => await getDetailCandidate(id),
);

export const detailCandidateLocalSlice = createSlice({
  name: 'detailCandidateLocal',
  initialState: {
    isSuccess: undefined,
    loading: false,
    data: [],
  },
  reducers: {},
  extraReducers: {
    [fetchDetailCandidateLocalSlice.pending]: (state) => {
      state.loading = true;
    },
    [fetchDetailCandidateLocalSlice.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.loading = false;
      state.isSuccess = true;
    },
    [fetchDetailCandidateLocalSlice.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});

const { reducer } = detailCandidateLocalSlice;
export default reducer;
