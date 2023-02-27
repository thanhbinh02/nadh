import React from 'react';

import { fetchCountries } from '../store/locationsSlice';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FilterDropDownCountryCity from '../components/Filter/FilterDropDownCountryCity';
import FilterDropDownIndustry from '../components/Filter/FilterDropDownIndustry';

import { fetchIndustries } from '../store/categoriesSlice';
import { fetchSectors } from '../store/categoriesSlice';
import { fetchCategories } from '../store/categoriesSlice';

import { fetchCandidates } from '../store/candidatesSlice';

import MainTable from '../components/Table';

export const Candidates = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.locations.countries);
  const industries = useSelector((state) => state.categories.industries);
  const sectors = useSelector((state) => state.categories.sectors);
  const categories = useSelector((state) => state.categories.categories);

  const candidates = useSelector((state) => state.candidates.data);

  useEffect(() => {
    dispatch(fetchCountries({ type: 4 }));
    dispatch(fetchIndustries({ type: 1 }));
    dispatch(fetchCandidates());
  }, []);

  return (
    <div>
      <h1>Candidates</h1>

      <FilterDropDownCountryCity data={countries ? countries : null} />
      <FilterDropDownIndustry
        data={industries ? industries : null}
        optionTwo={sectors}
        optionThree={categories}
        typeTwo={2}
        fetchDataItemTwo={fetchSectors}
        fetchDataItemThree={fetchCategories}
        typeThree={3}
      />
      <MainTable data={candidates ? candidates : null} />
    </div>
  );
};
