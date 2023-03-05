import React from 'react';
import { Select, Form } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

const { Option } = Select;

export const FormItemOption = ({
  options,
  name,
  label,
  actionDispatch,
  placeholder,
  defaultValue,
}) => {
  const dispatch = useDispatch();

  const handleChange = (value) => {
    dispatch(actionDispatch({ value: value, label: name }));
  };

  return (
    <Form.Item name={name} label={label}>
      <Select
        style={{ width: '100%', borderRadius: '0px' }}
        placeholder={placeholder}
        optionFilterProp="children"
        onChange={handleChange}
        defaultValue={defaultValue}
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
