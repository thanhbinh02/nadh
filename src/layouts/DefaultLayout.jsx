import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const DefaultLayout = () => {
  const token = useSelector((state) => state.auth.token);
  const user_sent = useSelector((state) => state.auth.user_sent);
  return token && user_sent ? <Navigate to="/candidates" /> : <Outlet />;
};
