import React from 'react';
import { Input } from 'antd';
import { FilterSearch } from './FilterSearch';

export const FilterDropDownText = ({ placeholder }) => {
  return (
    <FilterSearch>
      <Input
        style={{ width: '100%', borderRadius: '0px' }}
        placeholder={placeholder}
      />
    </FilterSearch>
  );
};
