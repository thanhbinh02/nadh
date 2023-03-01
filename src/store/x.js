import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getListCustomColumnsCandidates } from '../apis/filterApi';

export const fetchListCustomsCandidates = createAsyncThunk(
  'customColumnCandidates/fetchListCustomsCandidates',
  async () => await getListCustomColumnsCandidates(),
);

export const customColumnCandidatesSlice = createSlice({
  name: 'customColumnCandidates',
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
    [fetchListCustomsCandidates.fulfilled]: (state, { payload }) => {
      state.data = payload.data;
    },
  },
});

export const { addItemColumn } = customColumnCandidatesSlice.actions;

const { reducer } = customColumnCandidatesSlice;
export default reducer;
