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
import TagFilter from '../components/TagFilter';
import { filterTagCandidates } from '../utils/filterTagCandidates';
import { getTagsCandidates } from '../store/tagsCandidatesSlice';

export const Candidates = () => {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.locations.countries);
  const cities = useSelector((state) => state.locations.cities);
  const industries = useSelector((state) => state.categories.industries);
  const sectors = useSelector((state) => state.categories.sectors);
  const categories = useSelector((state) => state.categories.categories);
  const totalItem = useSelector((state) => state.candidates.count);
  const candidates = useSelector((state) => state.candidates.data);
  const languages = useSelector((state) => state.languages.languages);
  const listCustomCandidates = useSelector((state) => state.customColumn.data);

  const filerCandidates = JSON.parse(window.localStorage.getItem('filterCDD'));
  const listTagFilter = useSelector((state) => state.tagsCandidates.data);

  useEffect(() => {
    dispatch(fetchCountries({ type: 4 }));
    dispatch(fetchIndustries({ type: 1 }));
    dispatch(fetchCandidates(filerCandidates));
    dispatch(fetchLanguages({ type: 4 }));
    dispatch(fetchHighestDegree({ type: 1 }));
    dispatch(fetchListCustoms('candidates'));
    dispatch(getTagsCandidates(filerCandidates));
  }, []);

  return (
    <div>
      <h1>Candidates</h1>

      <CustomColumns namePage="candidates" listCustom={listCustomCandidates} />
      <TableCandidates
        totalItem={totalItem ? totalItem : null}
        data={candidates ? candidates : null}
        languages={languages ? languages : null}
        city={countries ? countries : null}
        sectors={sectors}
        categories={categories}
        industries={industries ? industries : null}
        listCustomCandidates={
          listCustomCandidates ? listCustomCandidates : null
        }
        listTagFilter={listTagFilter}
      />
    </div>
  );
};
