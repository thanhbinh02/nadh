import axiosClient from './axiosClient';

export const getFile = async (params) => {
  const url = '/nadh-mediafile/files';
  return await axiosClient.get(url, params);
};

export const deleteFile = async (id) => {
  const url = `/nadh-mediafile/file/${id}`;
  return await axiosClient.delete(url);
};

export const postFile = async (file) => {
  const url = '/nadh-mediafile/file';
  return await axiosClient.post(url, file, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
