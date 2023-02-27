import axiosClient from './axiosClient';

export const getCandidates = async (params) => {
  const url = '/api/candidates';
  return await axiosClient.get(url, params);
};
