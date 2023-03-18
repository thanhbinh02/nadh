import axiosClient from './axiosClient';

export const getClients = async (params) => {
  const url = '/api/clients';
  const dataSaveLocal = params.params;
  for (let prop in dataSaveLocal) {
    if (dataSaveLocal[prop] === '') {
      delete dataSaveLocal[prop];
    }
  }

  window.localStorage.setItem('filterClient', JSON.stringify(dataSaveLocal));
  return await axiosClient.get(url, params);
};
