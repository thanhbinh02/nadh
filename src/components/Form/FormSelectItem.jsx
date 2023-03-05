import React from 'react';
import { Form, Select } from 'antd/';
const { Option } = Select;

export const FormSelectItem = ({ options, name, label, placeholder, mode }) => {
  return (
    <Form.Item name={name} label={label}>
      <Select
        mode={mode}
        allowClear
        style={{ width: '100%', borderRadius: '0px' }}
        optionFilterProp="children"
        placeholder={placeholder}
      >
        {options.map((option) => {
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
