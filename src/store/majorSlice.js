import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getDegree } from '../apis/filterApi';
import { postPropertyValues } from '../apis/filterApi';
import { toast } from 'react-toastify';

export const fetchMajor = createAsyncThunk(
  'major/fetchMajor',
  async (params) =>
    await getDegree({
      params: {
        ...params,
        property_name: 'major',
      },
    }),
);

export const postMajor = createAsyncThunk(
  'major/postMajor',
  async (value) =>
    await postPropertyValues({
      value,
      name: 'major',
    }),
);

export const majorSlice = createSlice({
  name: 'major',
  initialState: {
    isSuccess: undefined,
    loading: false,
    data: [],
    item: {
      label: undefined,
      key: undefined,
    },
  },
  reducers: {
    putDataMajor: (state, { payload }) => {
      state.item.label = payload.label;
      state.item.key = payload.key;
    },
  },
  extraReducers: {
    [fetchMajor.pending]: (state) => {
      state.loading = true;
    },
    [fetchMajor.fulfilled]: (state, { payload }) => {
      state.data = payload.data;
      state.loading = false;
      state.isSuccess = false;
    },
    [fetchMajor.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
    [postMajor.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.item.key = payload.key;
      state.item.label = payload.label;
      toast.success('Success create!', {
        autoClose: 1000,
        position: 'top-right',
      });
    },
    [postMajor.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
      toast.error('Duplicate value!', {
        autoClose: 1000,
        position: 'top-right',
      });
    },
  },
});

export const { putDataMajor } = majorSlice.actions;

const { reducer } = majorSlice;
export default reducer;
