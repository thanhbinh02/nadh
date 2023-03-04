import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPosition } from '../apis/filterApi';

export const fetchPosition = createAsyncThunk(
  'Position/fetchPosition',
  async (params) =>
    await getPosition({
      params: {
        ...params,
        property_name: 'position',
      },
    }),
);

export const positionSlice = createSlice({
  name: 'position',
  initialState: {
    isSuccess: undefined,
    loading: false,
    data: [],
  },
  reducers: {},
  extraReducers: {
    [fetchPosition.pending]: (state) => {
      state.loading = true;
    },
    [fetchPosition.fulfilled]: (state, { payload }) => {
      state.data = payload.data;
      state.loading = false;
      state.isSuccess = false;
    },
    [fetchPosition.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});

const { reducer } = positionSlice;
export default reducer;
