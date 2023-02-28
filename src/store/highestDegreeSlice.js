import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getHighestDegree } from '../apis/filterApi';

export const fetchHighestDegree = createAsyncThunk(
  'highestDegree/fetchHighestDegree',
  async (params) =>
    await getHighestDegree({
      params: {
        ...params,
        property_name: 'degree',
      },
    }),
);

export const highestDegreeSlice = createSlice({
  name: 'highestDegree',
  initialState: {
    isSuccess: undefined,
    loading: false,
    highestDegree: [],
  },
  reducers: {},
  extraReducers: {
    [fetchHighestDegree.pending]: (state) => {
      state.loading = true;
    },
    [fetchHighestDegree.fulfilled]: (state, { payload }) => {
      state.highestDegree = payload.data;
      state.loading = false;
      state.isSuccess = false;
    },
    [fetchHighestDegree.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});

const { reducer } = highestDegreeSlice;
export default reducer;
