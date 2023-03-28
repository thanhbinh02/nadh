import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postPropertyValue } from '../apis/filterApi';
import { toast } from 'react-toastify';

export const postDepartment = createAsyncThunk(
  'department/postDepartment',
  async (value) =>
    await postPropertyValue({
      value,
      name: 'department',
    }),
);

export const departmentSlice = createSlice({
  name: 'position',
  initialState: {},
  extraReducers: {
    [postDepartment.fulfilled]: () => {
      toast.success('Success create!', {
        autoClose: 1000,
        position: 'top-right',
      });
    },
    [postDepartment.rejected]: () => {
      toast.error('Duplicate position value!', {
        autoClose: 1000,
        position: 'top-right',
      });
    },
  },
});

const { reducer } = departmentSlice;
export default reducer;
