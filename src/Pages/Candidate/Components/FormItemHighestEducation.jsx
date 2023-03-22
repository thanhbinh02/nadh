import React from 'react';
import { Select, Form } from 'antd';

const { Option } = Select;

export const FormItemHighestEducation = ({
  options,
  name,
  label,
  placeholder,
}) => {
  return (
    <Form.Item name={name} label={label}>
      <Select
        style={{ width: '100%', borderRadius: '0px' }}
        placeholder={placeholder}
        optionFilterProp="children"
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
