import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFile, deleteFile } from '../apis/fileApi';
import { toast } from 'react-toastify';
import { postFile } from '../apis/fileApi';

export const fetchFiles = createAsyncThunk(
  'file/fetchFiles',
  async (params) =>
    await getFile({
      params: {
        page: 1,
        perPage: 10,
        ...params,
      },
    }),
);

export const postFileRedux = createAsyncThunk(
  'file/postFileRedux',
  async (file) => await postFile(file),
);

export const fileSlice = createSlice({
  name: 'file',
  initialState: {
    isSuccess: false,
    loading: false,
    file: {},
    files: [],
    getFiles: false,
  },
  reducers: {
    removeFile: (state, { payload }) => {
      state.files = state.files.filter((item) => item.id !== payload);
      deleteFile(payload);
      toast.success('Delete success!', {
        autoClose: 1000,
        position: 'top-right',
      });
    },
  },
  extraReducers: {
    [fetchFiles.pending]: (state) => {
      state.isSuccess = false;
      state.loading = true;
    },
    [fetchFiles.fulfilled]: (state, { payload }) => {
      state.isSuccess = true;
      state.loading = false;
      state.files = payload.data;
    },
    [fetchFiles.rejected]: (state) => {
      state.isSuccess = false;
      state.loading = false;
    },

    [postFileRedux.fulfilled]: () => {
      toast.success('Add success!', {
        autoClose: 1000,
        position: 'top-right',
      });
    },
    [postFileRedux.rejected]: () => {
      toast.error('Add error!', {
        autoClose: 1000,
        position: 'top-right',
      });
    },
  },
});

export const { removeFile } = fileSlice.actions;

const { reducer } = fileSlice;
export default reducer;
