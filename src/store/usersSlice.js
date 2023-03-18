import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from '../apis/filterApi';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (params) =>
    await getUsers({
      params: {
        ...params,
        getAll: true,
      },
    }),
);

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    loading: false,
    isSuccess: false,
    data: [],
  },
  reducers: {},
  extraReducers: {
    [fetchUsers.pending]: (state) => {
      state.loading = true;
    },
    [fetchUsers.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload.data;
    },
  },
});

const { reducer } = usersSlice;
export default reducer;
