import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCandidates } from '../apis/candidatesApi';

export const fetchParamsCandidates = createAsyncThunk(
  'paramsCandidates/fetchParamsCandidates',
  async (params) =>
    await getCandidates({
      params: {
        page: 1,
        perPage: 10,
        ...params,
      },
    }),
);

export const paramsCandidatesSlice = createSlice({
  name: 'paramsCandidates',
  initialState: {
    isSuccess: undefined,
    loading: false,
    data: [],
  },
  reducers: {
    addParam: function (state, { payload }) {
      if (state.data.length === 0) {
        state.data = [payload];
      } else {
        state.data = state.data.map((item) => {
          return { ...item, ...payload };
        });
      }

      // state.data = state.data.map((item) => {
      //   return { ...item, ...payload };
      // });
    },
  },
  extraReducers: {
    [fetchParamsCandidates.pending]: (state) => {
      state.loading = true;
    },
    [fetchParamsCandidates.fulfilled]: (state, { payload }) => {
      console.log('payload', payload);
    },
    [fetchParamsCandidates.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});

export const { addParam } = paramsCandidatesSlice.actions;

const { reducer } = paramsCandidatesSlice;
export default reducer;
