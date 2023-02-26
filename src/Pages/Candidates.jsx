import React from 'react';
// import { fetchLocations } from '../store/locationsSlice';
import { fetchCountries } from '../store/locationsSlice';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Test from './Test';

export const Candidates = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.locations.countries);

  useEffect(() => {
    dispatch(fetchCountries({ type: 4 }));
    console.log(' countries', countries);
  }, []);

  return (
    <div>
      <h1>Candidates</h1>
      <Test data={countries ? countries : null} />
    </div>
  );
};
