import React from 'react';

import { fetchCountries } from '../store/locationsSlice';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchIndustries } from '../store/categoriesSlice';
import { fetchCandidates } from '../store/candidatesSlice';
import TableCandidates from '../components/Table/TableCandidates';
import { fetchLanguages } from '../store/languagesSlice';
import { fetchHighestDegree } from '../store/highestDegreeSlice';

import { CustomColumns } from '../components/CustomColumns';
import { fetchListCustoms } from '../store/customColumnSlice';

export const Candidates = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.locations.countries);
  const industries = useSelector((state) => state.categories.industries);
  const sectors = useSelector((state) => state.categories.sectors);
  const categories = useSelector((state) => state.categories.categories);
  const totalItem = useSelector((state) => state.candidates.count);

  console.log('totalItem', totalItem);

  const candidates = useSelector((state) => state.candidates.data);
  const languages = useSelector((state) => state.languages.languages);
  const listCustomCandidates = useSelector((state) => state.customColumn.data);

  useEffect(() => {
    dispatch(fetchCountries({ type: 4 }));
    dispatch(fetchIndustries({ type: 1 }));
    dispatch(fetchCandidates());
    dispatch(fetchLanguages({ type: 4 }));
    dispatch(fetchHighestDegree({ type: 1 }));
    dispatch(fetchListCustoms('candidates'));
  }, []);

  return (
    <div>
      <h1>Candidates</h1>
      <CustomColumns namePage="candidates" listCustom={listCustomCandidates} />
      <TableCandidates
        totalItem={totalItem ? totalItem : null}
        data={candidates ? candidates : null}
        languages={languages}
        city={countries ? countries : null}
        sectors={sectors}
        categories={categories}
        industries={industries ? industries : null}
        listCustomCandidates={
          listCustomCandidates ? listCustomCandidates : null
        }
      />
    </div>
  );
};
