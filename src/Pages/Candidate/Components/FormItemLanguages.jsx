import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

export const FormItemLanguages = ({
  handleChange,
  placeholder,
  defaultValue,
  options,
}) => {
  return (
    <Select
      mode="multiple"
      allowClear
      style={{ width: '100%', borderRadius: '0px' }}
      optionFilterProp="children"
      onChange={handleChange}
      placeholder={placeholder}
      defaultValue={defaultValue}
    >
      {options?.map((option) => {
        return (
          <Option
            key={option.key}
            value={option.key}
            label={option.label}
            disabled={option.disabled}
          >
            {option.label}
          </Option>
        );
      })}
    </Select>
  );
};
