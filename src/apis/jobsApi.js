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

export const putDetailJob = async (id, params) => {
  const url = `/api/jobs/${id}`;
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

      const checkPermission = error.response.data.find(
        (item) =>
          item.message === 'Cannot update job' && item.code === 'Permission',
      );

      const checkPermission1 = error.response.data.find(
        (item) => item.type === 'job update' && item.code === 'Permission',
      );

      if (checkPermission || checkPermission1) {
        toast.error('You do not have permission edit!', {
          autoClose: 1000,
          position: 'top-right',
        });
      }
    });
};

export const putDetailJobExtend = async (id, params) => {
  const url = `/api/jobs/${id}/extend`;
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
      console.log('error ne', error);

      const checkPermission = error.response.data.find(
        (item) => item.type === 'job extend' && item.code === 'Permission',
      );

      if (checkPermission) {
        toast.error('You do not have permission edit!', {
          autoClose: 1000,
          position: 'top-right',
        });
      }
    });
};

export const postComment = async (params) => {
  const url = '/api/comments';
  return await axiosClient.post(url, params);
};

export const postCandidateFlows = async (params) => {
  const url = '/api/candidate_flows';
  return await axiosClient
    .post(url, params)
    .then(function (response) {
      toast.success('Pick Success!', {
        autoClose: 1000,
        position: 'top-right',
      });
      return response;
    })
    .catch(function (error) {
      const checkPermission = error.response.data.find(
        (item) => item.type === 'job extend' && item.code === 'Permission',
      );

      if (checkPermission) {
        toast.error('You do not have permission edit!', {
          autoClose: 1000,
          position: 'top-right',
        });
      }
    });
};
