import axiosClient from './axiosClient';
import { toast } from 'react-toastify';

export const getClients = async (params) => {
  const url = '/api/clients';
  const dataSaveLocal = params.params;
  for (let prop in dataSaveLocal) {
    if (dataSaveLocal[prop] === '') {
      delete dataSaveLocal[prop];
    }
  }

  window.localStorage.setItem('filterClient', JSON.stringify(dataSaveLocal));
  return await axiosClient.get(url, params);
};

export const getListClient = async (params) => {
  const url = '/api/clients';
  return await axiosClient.get(url, params);
};

export const postClient = async (params) => {
  const url = '/api/clients';
  return await axiosClient
    .post(url, params)
    .then(function (response) {
      toast.success('Create Success!', {
        autoClose: 1000,
        position: 'top-right',
      });
      return response;
    })
    .catch(function (error) {
      const checkTaxCode = error.response.data.find(
        (item) =>
          item.message === 'Duplicated' && item.field === 'Duplicate tax code',
      );

      if (checkTaxCode) {
        toast.error('Tax code already exists!', {
          autoClose: 1000,
          position: 'top-right',
        });
      }
    });
};

export const getDetailClient = async (id) => {
  const url = `/api/clients/${id}`;
  return await axiosClient.get(url);
};

export const putDetailClient = async (id, params) => {
  const url = `/api/clients/${id}`;
  return await axiosClient
    .put(url, params)
    .then(function (response) {
      toast.success('Update Success!', {
        autoClose: 1000,
        position: 'top-right',
      });
      return response;
    })
    .catch(function (error) {
      console.log('error', error);

      // const checkEmails = error.response.data.find(
      //   (item) => item.message === 'Duplicated' && item.field === 'emails',
      // );
      // const checkPhone = error.response.data.find(
      //   (item) => item.message === 'Duplicated' && item.field === 'phones',
      // );
      // if (checkEmails) {
      //   toast.error('Email already exists!', {
      //     autoClose: 1000,
      //     position: 'top-right',
      //   });
      // }
      // if (checkPhone) {
      //   toast.error('Phone already exists!', {
      //     autoClose: 1000,
      //     position: 'top-right',
      //   });
      // }
    });
};
