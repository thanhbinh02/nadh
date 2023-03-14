import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { putDetailCandidate } from '../apis/candidatesApi';
import { toast } from 'react-toastify';

export const putBusinessLineSlice = createAsyncThunk(
  'businessLine/putBusinessLineSlice',
  async ({ id, params }) => await putDetailCandidate(id, params),
);

export const businessLineSlice = createSlice({
  name: 'businessLine',
  initialState: {
    isSuccess: undefined,
    loading: false,
  },
  reducers: {},
  extraReducers: {
    [putBusinessLineSlice.pending]: (state) => {
      state.loading = true;
    },
    [putBusinessLineSlice.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      toast.success('Successfully updated', {
        autoClose: 1000,
        position: 'top-right',
      });
    },
  },
});

const { reducer } = businessLineSlice;
export default reducer;
