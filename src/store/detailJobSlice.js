import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getDetailJob } from '../apis/jobsApi';
import { toast } from 'react-toastify';

export const fetchDetailJob = createAsyncThunk(
  'detailJob/fetchDetailJob',
  async (id) => await getDetailJob(id),
);

export const detailJobSlice = createSlice({
  name: 'detailJob',
  initialState: {
    isSuccess: false,
    loading: false,
    data: [],
    isPutSuccess: false,
    contactPerson: [],
    isLoadingContactPerson: false,
  },
  reducers: {},
  extraReducers: {
    [fetchDetailJob.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [fetchDetailJob.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.loading = false;
      state.isSuccess = true;
    },
    [fetchDetailJob.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});

const { reducer } = detailJobSlice;
export default reducer;
