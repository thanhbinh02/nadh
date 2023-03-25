import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postClient } from '../apis/clientsApi';

export const postNewClient = createAsyncThunk(
  'createClient/postNewClient',
  async (params) => await postClient(params),
);

export const createClient = createSlice({
  name: 'createClient',
  initialState: {
    isSuccessCreateClient: false,
    loading: false,
    newClient: [],
  },
  extraReducers: {
    [postNewClient.pending]: (state) => {
      state.postCandidateLoading = true;
    },
    [postNewClient.fulfilled]: (state, { payload }) => {
      if (payload !== undefined) {
        state.newClient = payload;
        state.postCandidateLoading = false;
        state.isSuccessCreateClient = true;
      }
    },
    [postNewClient.rejected]: (state) => {
      state.newClient = [];
      state.postCandidateLoading = false;
      state.isSuccessCreateClient = false;
    },
  },
});

const { reducer } = createClient;
export default reducer;
