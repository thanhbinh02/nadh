import axiosClient from './axiosClient';
import { toast } from 'react-toastify';

export const getCandidates = async (params) => {
  const url = '/api/candidates';
  const dataSaveLocal = params.params;
  for (let prop in dataSaveLocal) {
    if (dataSaveLocal[prop] === '') {
      delete dataSaveLocal[prop];
    }
  }

  window.localStorage.setItem('filterCDD', JSON.stringify(dataSaveLocal));
  return await axiosClient.get(url, params);
};

export const postCandidate = async (params) => {
  const url = '/api/candidates';
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
      const checkEmails = error.response.data.find(
        (item) => item.message === 'Duplicated' && item.field === 'emails',
      );

      const checkPhone = error.response.data.find(
        (item) => item.message === 'Duplicated' && item.field === 'phone',
      );

      if (checkEmails) {
        toast.error('Email already exists!', {
          autoClose: 1000,
          position: 'top-right',
        });
      }

      if (checkPhone) {
        toast.error('Phone already exists!', {
          autoClose: 1000,
          position: 'top-right',
        });
      }
    });
};

export const putDetailCandidate = async (id, params) => {
  const url = `/api/candidates/${id}`;
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
      const checkEmails = error.response.data.find(
        (item) => item.message === 'Duplicated' && item.field === 'emails',
      );
      const checkPhone = error.response.data.find(
        (item) => item.message === 'Duplicated' && item.field === 'phones',
      );
      if (checkEmails) {
        toast.error('Email already exists!', {
          autoClose: 1000,
          position: 'top-right',
        });
      }
      if (checkPhone) {
        toast.error('Phone already exists!', {
          autoClose: 1000,
          position: 'top-right',
        });
      }
    });
};

export const getDetailCandidate = async (id) => {
  const url = `/api/candidates/${id}`;
  return await axiosClient.get(url);
};

export const putCandidateInDetailPage = async (id, params) => {
  const url = `/api/candidates/${id}`;
  return await axiosClient.put(url, params);
};

export const postCandidateTest = async (params) => {
  const url = '/api/candidates';
  return await axiosClient.post(url, params);
};

export const postCandidateHistories = async (params) => {
  const url = `/api/candidate_histories`;
  return await axiosClient.post(url, params);
};

export const putCandidateHistories = async (id, params) => {
  const url = `/api/candidate_histories/${id}`;
  await axiosClient.put(url, params);
};

export const deleteCandidateHistories = async (id) => {
  const url = `/api/candidate_histories/${id}`;
  await axiosClient.delete(url);
};
