import axiosClient from './axiosClient';
import { toast } from 'react-toastify';

export const getJobs = async (params) => {
  const url = '/api/jobs';
  return await axiosClient.get(url, params);
};
