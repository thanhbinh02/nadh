import { createSlice } from '@reduxjs/toolkit';

export const tagsClientsSlice = createSlice({
  name: 'tagsClients',
  initialState: {
    isSuccess: undefined,
    loading: false,
    data: localStorage.getItem('filterClient'),
  },
  reducers: {
    getTagsClients: (state, { payload }) => {
      state.data = payload;
    },
  },
});

export const { getTagsClients } = tagsClientsSlice.actions;

const { reducer } = tagsClientsSlice;
export default reducer;
