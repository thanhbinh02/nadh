import axiosClient from './axiosClient';

export const loginAuth = async (userName, password) => {
  const url = '/login';
  return await axiosClient.post(url, {
    user_name: userName,
    password: password,
  });
};
