import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getClients } from '../apis/clientsApi';

export const fetchClients = createAsyncThunk(
  'clients/fetchClients',
  async (params) =>
    await getClients({
      params: {
        page: 1,
        perPage: 10,
        ...params,
      },
    }),
);

export const refreshClients = createAsyncThunk(
  'clients/refreshClients',
  async (params) =>
    await getClients({
      params: {
        page: 1,
        perPage: 10,
        ...params,
      },
    }),
);

export const clientsSlice = createSlice({
  name: 'clients',
  initialState: {
    isSuccess: false,
    loading: false,
    data: undefined,
    count: 0,
  },
  reducers: {},
  extraReducers: {
    [fetchClients.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [fetchClients.fulfilled]: (state, { payload }) => {
      state.data = payload.data;
      state.count = payload.count;
      state.loading = false;
      state.isSuccess = true;
    },
    [fetchClients.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
    [refreshClients.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [refreshClients.fulfilled]: (state, { payload }) => {
      state.data = payload.data;
      state.count = payload.count;
      state.loading = false;
      state.isSuccess = true;
    },
    [refreshClients.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});

const { reducer } = clientsSlice;
export default reducer;
