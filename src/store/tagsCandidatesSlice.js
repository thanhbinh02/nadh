import { createSlice } from '@reduxjs/toolkit';

export const tagsCandidatesSlice = createSlice({
  name: 'tagsCandidates',
  initialState: {
    isSuccess: undefined,
    loading: false,
    data: localStorage.getItem('filterCDD'),
  },
  reducers: {
    getTagsCandidates: (state, { payload }) => {
      state.data = payload;
      window.localStorage.setItem('filterCDD', JSON.stringify(payload));
    },
  },
});

export const { getTagsCandidates } = tagsCandidatesSlice.actions;

const { reducer } = tagsCandidatesSlice;
export default reducer;
