import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getNationality } from '../apis/filterApi';
import { postPropertyValue } from '../apis/filterApi';
import { toast } from 'react-toastify';

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

export const postNationality = createAsyncThunk(
  'nationality/postNationality',
  async (value) =>
    await postPropertyValue({
      value,
      name: 'nationality',
    }),
);

export const nationalitySlice = createSlice({
  name: 'nationality',
  initialState: {
    isSuccess: undefined,
    loading: false,
    data: [],
    keyNationality: undefined,
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
    [fetchNationality.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [postNationality.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.keyNationality = payload.key;
      toast.success('Success create!', {
        autoClose: 1000,
        position: 'top-right',
      });
    },
    [postNationality.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
      toast.error('Duplicate nationality value!', {
        autoClose: 1000,
        position: 'top-right',
      });
    },
  },
});

const { reducer } = nationalitySlice;
export default reducer;
