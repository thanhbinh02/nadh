import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const DefaultLayout = () => {
  const token = useSelector((state) => state.auth.token);
  return token ? <Navigate to="/candidates" /> : <Outlet />;
};
