import React from 'react';
import { Form, Select } from 'antd/';
const { Option } = Select;

export const FormSelectItem = ({ options, name, label }) => {
  return (
    <Form.Item name={name} label={label}>
      <Select
        mode="multiple"
        allowClear
        style={{ width: '100%', borderRadius: '0px' }}
        optionFilterProp="children"
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
