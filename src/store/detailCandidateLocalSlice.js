import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getDetailCandidate } from '../apis/candidatesApi';

export const detailCandidateLocalSlice = createSlice({
  name: 'detailCandidateLocal',
  initialState: {
    isSuccess: undefined,
    loading: false,
    data: [],
  },
  reducers: {},
  extraReducers: {},
});

const { reducer } = detailCandidateLocalSlice;
export default reducer;
