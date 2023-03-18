import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getDegree } from '../apis/filterApi';

export const fetchSchool = createAsyncThunk(
  'school/fetchSchool',
  async (params) =>
    await getDegree({
      params: {
        ...params,
        property_name: 'school',
      },
    }),
);

export const schoolSlice = createSlice({
  name: 'school',
  initialState: {
    isSuccess: undefined,
    loading: false,
    data: [],
  },
  reducers: {},
  extraReducers: {
    [fetchSchool.pending]: (state) => {
      state.loading = true;
    },
    [fetchSchool.fulfilled]: (state, { payload }) => {
      state.data = payload.data;
      state.loading = false;
      state.isSuccess = false;
    },
    [fetchSchool.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});

const { reducer } = schoolSlice;
export default reducer;
