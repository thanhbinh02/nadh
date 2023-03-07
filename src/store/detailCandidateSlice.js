import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getDetailCandidate } from '../apis/candidatesApi';

export const fetchDetailCandidateSlice = createAsyncThunk(
  'detailCandidate/fetchDetailCandidateSlice',
  async (id) => await getDetailCandidate(id),
);

export const detailCandidateSlice = createSlice({
  name: 'detailCandidate',
  initialState: {
    isSuccess: undefined,
    loading: false,
    data: [],
  },
  reducers: {},
  extraReducers: {
    [fetchDetailCandidateSlice.pending]: (state) => {
      state.loading = true;
    },
    [fetchDetailCandidateSlice.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.loading = false;
      state.isSuccess = true;
    },
    [fetchDetailCandidateSlice.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});

const { reducer } = detailCandidateSlice;
export default reducer;
