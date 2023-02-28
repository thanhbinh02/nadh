import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getLanguages } from '../apis/filterApi';

export const fetchLanguages = createAsyncThunk(
  'language/fetchLanguages',
  async (params) =>
    await getLanguages({
      params: {
        ...params,
        property_name: 'language',
      },
    }),
);

export const languagesSlice = createSlice({
  name: 'languages',
  initialState: {
    isSuccess: undefined,
    loading: false,
    languages: [],
  },
  reducers: {},
  extraReducers: {
    [fetchLanguages.pending]: (state) => {
      state.loading = true;
    },
    [fetchLanguages.fulfilled]: (state, { payload }) => {
      state.languages = payload.data;
      state.loading = false;
      state.isSuccess = false;
    },
    [fetchLanguages.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});

const { reducer } = languagesSlice;
export default reducer;
