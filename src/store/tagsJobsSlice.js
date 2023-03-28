import { createSlice } from '@reduxjs/toolkit';

export const tagsJobsSlice = createSlice({
  name: 'tagsJobs',
  initialState: {
    isSuccess: undefined,
    loading: false,
    data: localStorage.getItem('filterJobs'),
  },
  reducers: {
    getTagsJobs: (state, { payload }) => {
      state.data = payload;
      window.localStorage.setItem('filterJobs', JSON.stringify(payload));
    },
  },
});

export const { getTagsJobs } = tagsJobsSlice.actions;

const { reducer } = tagsJobsSlice;
export default reducer;
