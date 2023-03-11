import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const axiosClient = axios.create({
  baseURL: 'https://lubrytics.com:8443/nadh-api-crm',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  function (config) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  function (response) {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  function (error) {
    if (
      error.response.data.message === 'Invalid tokenForbiddenError: Forbidden'
    ) {
      window.location.reload();
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('user_sent');
    }

    if (error.message === 'Request failed with status code 401') {
      window.location.reload();
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('user_sent');
      useNavigate('/');
    }
    return Promise.reject(error);
  },
);

export default axiosClient;
