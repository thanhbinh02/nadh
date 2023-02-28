import React from 'react';
import { FilterSearch } from './FilterSearch';
import { Select } from 'antd';

// mode = tags
export const FilterDropDownSelectOneItem = ({ placeholder, mode, options }) => {
  const onChange = (value) => {};

  return (
    <FilterSearch>
      <Select
        mode={mode}
        allowClear
        style={{ width: '100%', borderRadius: '0px' }}
        placeholder={placeholder}
        optionFilterProp="children"
        onChange={onChange}
      >
        {options.map((option) => {
          return (
            <Select.Option
              key={option.key}
              value={option.id}
              label={option.label}
            >
              {option.label}
            </Select.Option>
          );
        })}
      </Select>
    </FilterSearch>
  );
};
