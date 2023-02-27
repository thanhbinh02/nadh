import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getLocations } from '../apis/filterApi';

export const fetchCountries = createAsyncThunk(
  'location/fetchCountries',
  async (params) =>
    await getLocations({
      params,
    }),
);

export const fetchCities = createAsyncThunk(
  'location/fetchCities',
  async (params) =>
    await getLocations({
      params,
    }),
);

export const locationsSlice = createSlice({
  name: 'locations',
  initialState: {
    isSuccess: undefined,
    loading: false,
    countries: [],
    cities: undefined,
  },
  reducers: {},
  extraReducers: {
    [fetchCountries.pending]: (state) => {
      state.loading = true;
    },
    [fetchCountries.fulfilled]: (state, { payload }) => {
      state.countries = payload.data;
      state.loading = false;
      state.isSuccess = false;
    },
    [fetchCountries.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
    [fetchCities.pending]: (state) => {
      state.loading = true;
    },
    [fetchCities.fulfilled]: (state, { payload }) => {
      state.cities = payload.data;
      state.loading = false;
      state.isSuccess = false;
    },
    [fetchCities.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
      state.cities = undefined;
    },
  },
});

const { reducer } = locationsSlice;
export default reducer;
