import axiosClient from './axiosClient';
import axios from 'axios';
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

//lubrytics.com:8443/nadh-api-crm/api/candidates

export const postCandidate = async (params) => {
  const url = '/api/candidates';
  return await axiosClient
    .post(url, params)
    .then(function (response) {
      window.localStorage.setItem('candidateDetail', JSON.stringify(response));
      window.localStorage.setItem('currentStep', 1);
      toast.success('Create Success!', {
        autoClose: 1000,
        position: 'top-right',
      });
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
      window.localStorage.setItem('candidateDetail', JSON.stringify(response));
    })
    .catch(function (error) {});
};

export const getDetailCandidate = async (id) => {
  const url = `/api/candidates/${id}`;
  return await axiosClient.get(url);
};

export const putCandidateInDetailPage = async (id, params) => {
  const url = `/api/candidates/${id}`;
  return await axiosClient.put(url, params);
};
