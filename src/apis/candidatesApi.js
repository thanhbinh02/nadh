import axiosClient from './axiosClient';
import axios from 'axios';

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
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const putDetailCandidate = async (id, params) => {
  const url = `/api/candidates/${id}`;
  return await axiosClient
    .put(url, params)
    .then(function (response) {
      window.localStorage.setItem('candidateDetail', JSON.stringify(response));
    })
    .catch(function (error) {
      console.log(error);
    });
};
