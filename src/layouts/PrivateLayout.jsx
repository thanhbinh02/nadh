import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Header } from './components/Header';
import { NavHeader } from './components/NavHeader';

export const PrivateLayout = () => {
  const token = useSelector((state) => state.auth.token);
  return token ? (
    <>
      <Header />
      <NavHeader />
      <Outlet />
    </>
  ) : (
    <Navigate to="/" />
  );
};
