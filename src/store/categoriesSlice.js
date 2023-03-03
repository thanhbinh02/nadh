import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCategories } from '../apis/filterApi';

export const fetchIndustries = createAsyncThunk(
  'category/fetchIndustries',
  async (params) =>
    await getCategories({
      params,
    }),
);

export const fetchSectors = createAsyncThunk(
  'category/fetchSectors',
  async (params) =>
    await getCategories({
      params,
    }),
);

export const fetchCategories = createAsyncThunk(
  'category/fetchCategories',
  async (params) =>
    await getCategories({
      params,
    }),
);

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    isSuccess: undefined,
    loading: false,
    industries: [],
    sectors: undefined,
    categories: undefined,
  },
  reducers: {},
  extraReducers: {
    [fetchIndustries.pending]: (state) => {
      state.loading = true;
    },
    [fetchIndustries.fulfilled]: (state, { payload }) => {
      state.industries = payload.data;
      state.loading = false;
      state.isSuccess = false;
    },
    [fetchIndustries.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
    [fetchSectors.pending]: (state) => {
      state.loading = true;
    },
    [fetchSectors.fulfilled]: (state, { payload }) => {
      state.sectors = payload.data;
      state.loading = false;
      state.isSuccess = false;
    },
    [fetchSectors.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
      state.sectors = undefined;
    },
    [fetchCategories.pending]: (state) => {
      state.loading = true;
    },
    [fetchCategories.fulfilled]: (state, { payload }) => {
      console.log('payload', payload);

      state.categories = payload.data;
      state.loading = false;
      state.isSuccess = false;
    },
    [fetchCategories.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
      state.categories = undefined;
    },
  },
});

const { reducer } = categoriesSlice;
export default reducer;
