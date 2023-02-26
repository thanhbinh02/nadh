import React from 'react';
import { FilterSearch } from './FilterSearch';
import { Select } from 'antd';

const options = [
  {
    value: '1',
    label: 'Not Identified',
  },
  {
    value: '2',
    label: 'Closed',
  },
  {
    value: '3',
    label: 'Communicated',
  },
  {
    value: '4',
    label: 'Identified',
  },
  {
    value: '5',
    label: 'Resolved',
  },
  {
    value: '6',
    label: 'Cancelled',
  },
];

// mode = tags
export const FilterDropDownSelectOneItem = ({ placeholder, mode }) => {
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
        {options.map((option, key) => {
          return (
            <Select.Option key={key} value={option.value} label={option.label}>
              {option.label}
            </Select.Option>
          );
        })}
      </Select>
    </FilterSearch>
  );
};
