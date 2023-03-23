import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postPropertyValues } from '../apis/filterApi';
import { toast } from 'react-toastify';

export const postCompany = createAsyncThunk(
  'company/postCompany',
  async (value) =>
    await postPropertyValues({
      value,
      name: 'company',
    }),
);

export const companySlice = createSlice({
  name: 'company',
  initialState: {
    isSuccess: undefined,
    loading: false,
    data: [],
    item: {
      label: undefined,
      key: undefined,
    },
  },
  reducers: {},
  extraReducers: {
    [postCompany.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.item.key = payload.key;
      state.item.label = payload.label;
      toast.success('Success create!', {
        autoClose: 1000,
        position: 'top-right',
      });
    },
    [postCompany.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
      toast.error('Duplicate value!', {
        autoClose: 1000,
        position: 'top-right',
      });
    },
  },
});

const { reducer } = companySlice;
export default reducer;
