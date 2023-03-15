import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getListCustomColumns } from '../apis/filterApi';
import { updateListCustomColumns } from '../apis/filterApi';

export const fetchListCustoms = createAsyncThunk(
  'customColumnSlice/fetchListCustoms',
  async (name) => await getListCustomColumns(name),
);

export const putListCustomColumns = createAsyncThunk(
  'customColumnSlice/putListCustomColumns',
  updateListCustomColumns,
);

export const customColumnSlice = createSlice({
  name: 'customColumn',
  initialState: {
    data: [],
    loading: false,
    isSuccess: false,
  },
  reducers: {
    addItemColumn: function (state, { payload }) {
      if (payload.myCheck === false) {
        state.data = state.data.filter((item) => item !== payload.title);
      } else {
        state.data.push(payload.title);
      }
    },
  },
  extraReducers: {
    [fetchListCustoms.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [fetchListCustoms.fulfilled]: (state, { payload }) => {
      state.data = payload.data;
      state.isSuccess = true;
    },
    [putListCustomColumns.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [putListCustomColumns.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload.data;
    },
  },
});

export const { addItemColumn } = customColumnSlice.actions;

const { reducer } = customColumnSlice;
export default reducer;
