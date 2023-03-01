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
    [fetchListCustoms.fulfilled]: (state, { payload }) => {
      state.data = payload.data;
    },
    [putListCustomColumns.pending.type]: (state) => {
      state.loading = true;
    },
    [putListCustomColumns.fulfilled.type]: (state, { payload }) => {
      state.loading = false;
      state.data = payload.data;
    },
  },
});

export const { addItemColumn } = customColumnSlice.actions;

const { reducer } = customColumnSlice;
export default reducer;
