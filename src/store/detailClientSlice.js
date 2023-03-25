import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getDetailClient, putDetailClient } from '../apis/clientsApi';

export const fetchDetailClientSlice = createAsyncThunk(
  'detailClient/fetchDetailClientSlice',
  async (id) => await getDetailClient(id),
);

export const fetchDetailClientSliceNotLoading = createAsyncThunk(
  'detailClient/fetchDetailClientSliceNotLoading',
  async (id) => await getDetailClient(id),
);

export const putNewDetailClient = createAsyncThunk(
  'detailClient/putNewDetailClient',
  async ({ id, params }) => await putDetailClient(id, params),
);

export const detailClientSlice = createSlice({
  name: 'detailClient',
  initialState: {
    isSuccess: false,
    loading: false,
    data: [],
    isPutSuccess: false,
  },
  extraReducers: {
    [fetchDetailClientSlice.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [fetchDetailClientSlice.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.loading = false;
      state.isSuccess = true;
    },
    [fetchDetailClientSlice.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
    [fetchDetailClientSliceNotLoading.fulfilled]: (state, { payload }) => {
      state.isLoadingAcademic = false;
      state.loading = false;
      state.data = payload;
    },
    [putNewDetailClient.pending]: (state) => {
      state.isPutSuccess = false;
    },
    [putNewDetailClient.fulfilled]: (state, { payload }) => {
      if (payload === undefined) {
        state.data = payload;
        state.isPutSuccess = false;
      } else {
        state.isPutSuccess = true;
      }
    },
  },
});

const { reducer } = detailClientSlice;
export default reducer;
