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

// Custom column
export const getListCustomColumnsCandidates = async () => {
  const url = '/api/user_pages?key_page=candidates';
  return await axiosClient.get(url);
};

export const getListCustomColumns = async (name) => {
  const url = `/api/user_pages?key_page=${name}`;
  return await axiosClient.get(url);
};

export const updateListCustomColumns = async (params) => {
  const url = `/api/user_pages`;
  return await axiosClient.put(url, params);
};

export const getNationality = async (params) => {
  const url = '/api/property_values';
  return await axiosClient.get(url, params);
};

export const getPosition = async (params) => {
  const url = '/api/property_values';
  return await axiosClient.get(url, params);
};

export const getDegree = async (params) => {
  const url = '/api/property_values';
  return await axiosClient.get(url, params);
};
