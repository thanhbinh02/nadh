import React from 'react';
import { Select, Form } from 'antd';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const { Option } = Select;

export const FormItemHighestEducation = ({
  options,
  name,
  label,
  actionDispatch,
  placeholder,
  defaultValue,
  form,
  setOpen,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (defaultValue !== undefined) {
      form.setFieldValue(name, Number(defaultValue));
    }
  }, []);

  const handleChange = (value) => {
    if (setOpen) {
      setOpen(true);
    }
    const item = options.find((item) => item.key === value);
    dispatch(
      actionDispatch({
        value: {
          label: item.label,
          key: value,
        },
        label: name,
      }),
    );
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
