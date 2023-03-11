import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getDegree } from '../apis/filterApi';

export const fetchDegree = createAsyncThunk(
  'degree/fetchDegree',
  async (params) =>
    await getDegree({
      params: {
        ...params,
        property_name: 'degree',
      },
    }),
);

export const degreeSlice = createSlice({
  name: 'degree',
  initialState: {
    isSuccess: undefined,
    loading: false,
    data: [],
  },
  reducers: {},
  extraReducers: {
    [fetchDegree.pending]: (state) => {
      state.loading = true;
    },
    [fetchDegree.fulfilled]: (state, { payload }) => {
      state.data = payload.data;
      state.loading = false;
      state.isSuccess = false;
    },
    [fetchDegree.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});

const { reducer } = degreeSlice;
export default reducer;
