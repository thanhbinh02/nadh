import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getNationality } from '../apis/filterApi';

export const fetchNationality = createAsyncThunk(
  'nationality/fetchNationality',
  async (params) =>
    await getNationality({
      params: {
        ...params,
        property_name: 'nationality',
      },
    }),
);

export const nationalitySlice = createSlice({
  name: 'nationality',
  initialState: {
    isSuccess: undefined,
    loading: false,
    data: [],
  },
  reducers: {},
  extraReducers: {
    [fetchNationality.pending]: (state) => {
      state.loading = true;
    },
    [fetchNationality.fulfilled]: (state, { payload }) => {
      state.data = payload.data;
      state.loading = false;
      state.isSuccess = false;
    },
    [fetchNationality.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});

const { reducer } = nationalitySlice;
export default reducer;
