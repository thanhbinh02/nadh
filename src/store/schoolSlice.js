import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getDegree } from '../apis/filterApi';
import { postPropertyValues } from '../apis/filterApi';
import { toast } from 'react-toastify';

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

export const postSchool = createAsyncThunk(
  'school/postSchool',
  async (value) =>
    await postPropertyValues({
      value,
      name: 'school',
    }),
);

export const schoolSlice = createSlice({
  name: 'school',
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
    putDataSchool: (state, { payload }) => {
      state.item.label = payload.label;
      state.item.key = payload.key;
    },
  },
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
    [postSchool.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.item.key = payload.key;
      state.item.label = payload.label;
      toast.success('Success create!', {
        autoClose: 1000,
        position: 'top-right',
      });
    },
    [postSchool.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
      toast.error('Duplicate value!', {
        autoClose: 1000,
        position: 'top-right',
      });
    },
  },
});

export const { putDataSchool } = schoolSlice.actions;

const { reducer } = schoolSlice;
export default reducer;
