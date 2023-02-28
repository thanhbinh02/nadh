import React from 'react';
import { Input } from 'antd';
import { FilterSearch } from './FilterSearch';

export const FilterDropDownText = (props) => {
  return (
    <FilterSearch>
      <Input
        style={{ width: '100%', borderRadius: '0px' }}
        placeholder={props.placeholder}
      />
    </FilterSearch>
  );
};
