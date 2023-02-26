import axiosClient from './axiosClient';

export const getListCandidates = async () => {
  const url = '/api/users?page=1&perPage=10';
  return await axiosClient.get(url);
};
