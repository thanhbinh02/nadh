import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getPosition } from '../apis/filterApi';
import { postPropertyValue } from '../apis/filterApi';
import { toast } from 'react-toastify';

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

export const postPosition = createAsyncThunk(
  'position/postPosition',
  async (value) =>
    await postPropertyValue({
      value,
      name: 'position',
    }),
);

export const positionSlice = createSlice({
  name: 'position',
  initialState: {
    isSuccess: undefined,
    loading: false,
    data: [],
    keyPosition: undefined,
    item: {
      label: undefined,
      key: undefined,
    },
  },
  reducers: {
    putDataPosition: (state, { payload }) => {
      state.item.label = payload.label;
      state.item.key = payload.key;
    },
  },
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
    [postPosition.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.keyPosition = payload.key;
      toast.success('Success create!', {
        autoClose: 1000,
        position: 'top-right',
      });
    },
    [postPosition.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
      toast.error('Duplicate position value!', {
        autoClose: 1000,
        position: 'top-right',
      });
    },
  },
});

export const { putDataPosition } = positionSlice.actions;
const { reducer } = positionSlice;
export default reducer;
