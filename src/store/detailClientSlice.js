import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getDetailClient,
  putDetailClient,
  postNewContactPersons,
  putContactPersons,
  deleteContactPersons,
} from '../apis/clientsApi';
import { toast } from 'react-toastify';

export const fetchDetailClientSlice = createAsyncThunk(
  'detailClient/fetchDetailClientSlice',
  async (id) => await getDetailClient(id),
);

export const fetchDetailClientSliceNotLoading = createAsyncThunk(
  'detailClient/fetchDetailClientSliceNotLoading',
  async (id) => await getDetailClient(id),
);

export const putNewDetailClient = createAsyncThunk(
  'detailClient/putNewDetailClient',
  async ({ id, params }) => await putDetailClient(id, params),
);

export const postNewContactPersonsSlice = createAsyncThunk(
  'detailClient/postNewContactPersonsSlice',
  postNewContactPersons,
);

export const putContactPersonsSlice = createAsyncThunk(
  'detailClient/putContactPersonsSlice',
  async ({ id, params }) => await putContactPersons(id, params),
);

export const detailClientSlice = createSlice({
  name: 'detailClient',
  initialState: {
    isSuccess: false,
    loading: false,
    data: [],
    isPutSuccess: false,
    contactPerson: [],
    isLoadingContactPerson: false,
  },
  reducers: {
    deleteContact: (state, { payload }) => {
      state.contactPerson = state.contactPerson.filter(
        (item) => item.id !== payload,
      );
      deleteContactPersons(payload);
      toast.success('Delete success!', {
        autoClose: 1000,
        position: 'top-right',
      });
    },
  },
  extraReducers: {
    [fetchDetailClientSlice.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [fetchDetailClientSlice.fulfilled]: (state, { payload }) => {
      state.data = payload;
      state.contactPerson = payload.pic;
      state.loading = false;
      state.isSuccess = true;
    },
    [fetchDetailClientSlice.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
    [fetchDetailClientSliceNotLoading.fulfilled]: (state, { payload }) => {
      state.isLoadingAcademic = false;
      state.contactPerson = payload.pic;
      state.loading = false;
      state.data = payload;
    },
    [putNewDetailClient.pending]: (state) => {
      state.isPutSuccess = false;
    },
    [putNewDetailClient.fulfilled]: (state, { payload }) => {
      if (payload === undefined) {
        state.data = payload;
        state.isPutSuccess = false;
      } else {
        state.isPutSuccess = true;
      }
    },

    [postNewContactPersonsSlice.pending]: (state) => {
      state.isLoadingContactPerson = true;
    },
    [postNewContactPersonsSlice.fulfilled]: (state) => {
      state.isLoadingContactPerson = false;
      toast.success('Create success!', {
        autoClose: 1000,
        position: 'top-right',
      });
    },
    [postNewContactPersonsSlice.rejected]: (state) => {
      state.isLoadingContactPerson = false;
      toast.error('Create error!', {
        autoClose: 1000,
        position: 'top-right',
      });
    },

    [putContactPersonsSlice.fulfilled]: (state, { payload }) => {
      if (payload !== undefined) {
        toast.success('Update success!', {
          autoClose: 1000,
          position: 'top-right',
        });
      }
    },
    [putContactPersonsSlice.rejected]: (state, payload) => {
      toast.error('Update error!', {
        autoClose: 1000,
        position: 'top-right',
      });
    },
  },
});

export const { deleteContact } = detailClientSlice.actions;

const { reducer } = detailClientSlice;
export default reducer;
