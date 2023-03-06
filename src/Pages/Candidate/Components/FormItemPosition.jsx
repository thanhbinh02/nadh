import React from 'react';
import { Form, Select } from 'antd';
import { useDispatch } from 'react-redux';

const { Option } = Select;
export const FormItemPosition = ({ options, name, label, actionDispatch }) => {
  const dispatch = useDispatch();

  const handleChange = (value) => {
    const selectedLabels = [];
    options.forEach((option) => {
      if (value.includes(option.key)) {
        selectedLabels.push(option.label);
      }
    });
    const result = [];

    for (let i = 0; i < value.length; i++) {
      result.push({
        key: value[i],
        label: selectedLabels[i],
      });
    }

    dispatch(actionDispatch(result));
  };

  return (
    <Form.Item name={name} label={label}>
      <Select
        mode="multiple"
        allowClear
        style={{ width: '100%', borderRadius: '0px' }}
        optionFilterProp="children"
        onChange={handleChange}
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
