import React from 'react';
import { Select, Form } from 'antd';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const { Option } = Select;

export const FormItemOption = ({
  options,
  name,
  label,
  actionDispatch,
  placeholder,
  defaultValue,
  check,
  form,
  setOpen,
  setCancel,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    form.setFieldValue(name, defaultValue);
  }, []);

  const handleChange = (value) => {
    if (setCancel) {
      setCancel(false);
    }

    if (setOpen) {
      setOpen(true);
    }
    dispatch(actionDispatch({ value: value, label: name }));
  };

  return (
    <Form.Item name={name} label={label}>
      <Select
        style={{ width: '100%', borderRadius: '0px' }}
        placeholder={placeholder}
        optionFilterProp="children"
        onChange={handleChange}
        disabled={check}
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
