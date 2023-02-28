import axiosClient from './axiosClient';

export const getLocations = async (params) => {
  const url = '/api/locations';
  return await axiosClient.get(url, params);
};

export const getCategories = async (params) => {
  const url = '/api/categories';
  return await axiosClient.get(url, params);
};

export const getLanguages = async (params) => {
  const url = '/api/property_values';
  return await axiosClient.get(url, params);
};

export const getHighestDegree = async (params) => {
  const url = '/api/property_values';
  return await axiosClient.get(url, params);
};
