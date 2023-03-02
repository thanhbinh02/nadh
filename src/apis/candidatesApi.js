import axiosClient from './axiosClient';

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
