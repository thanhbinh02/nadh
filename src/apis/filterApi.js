import axiosClient from './axiosClient';

export const getLocations = async (params) => {
  return await axiosClient.get('/api/locations', params);
};

export const getCategories = async (params) => {
  return await axiosClient.get('/api/categories', params);
};
