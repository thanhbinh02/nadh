import React from 'react';
import { Select, Form } from 'antd';

import { getKeyWithLabel } from '../../../utils/const';
const { Option } = Select;

export const FormItemOption = ({ options, name, label, placeholder, form }) => {
  const handleChange = (value, option) => {
    form.setFieldValue(name, getKeyWithLabel(option));
  };

  return (
    <Form.Item name={name} label={label}>
      <Select
        style={{ width: '100%', borderRadius: '0px' }}
        placeholder={placeholder}
        optionFilterProp="children"
        onChange={handleChange}
      >
        {options?.map((option) => {
          return (
            <Option key={option.key} value={option.key} label={option.label}>
              {option.label}
            </Option>
          );
        })}
      </Select>
    </Form.Item>
  );
};
