import axiosClient from './axiosClient';
import { toast } from 'react-toastify';

export const getJobs = async (params) => {
  const url = '/api/jobs';
  return await axiosClient.get(url, params);
};

export const postJob = async (params) => {
  const url = '/api/jobs';
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
      console.log('error create job', error);
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

export const getDetailJob = async (id) => {
  const url = `/api/jobs/${id}`;
  return await axiosClient.get(url);
};
