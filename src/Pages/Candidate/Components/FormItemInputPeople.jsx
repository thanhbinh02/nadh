import React, { useEffect } from 'react';
import { Form, Input } from 'antd';
import { useDispatch } from 'react-redux';

export const FormItemInputPeople = ({
  label,
  name,
  placeholder,
  required,
  message,
  actionDispatch,
  defaultValue,
  form,
  setOpen,
  setCancel,
}) => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    if (setCancel) {
      setCancel(false);
    }
    if (setOpen) {
      setOpen(true);
    }
    dispatch(actionDispatch({ value: e.target.value, label: name }));
  };

  useEffect(() => {
    if (defaultValue !== undefined) {
      form.setFieldValue(name, defaultValue);
    }
  }, []);

  return (
    <>
      {required ? (
        <Form.Item
          label={label}
          required={required}
          name={name}
          rules={[
            {
              required: true,
              message: message,
            },
            {
              pattern: /^[a-zA-Z\s]+$/,
              message: 'Please enter only alphanumeric characters',
            },
          ]}
        >
          <Input placeholder={placeholder} onChange={handleChange} />
        </Form.Item>
      ) : (
        <Form.Item
          label={label}
          name={name}
          rules={[
            {
              pattern: /^[a-zA-Z\s]+$/,
              message: 'Please enter only alphanumeric characters',
            },
          ]}
        >
          <Input placeholder={placeholder} onChange={handleChange} />
        </Form.Item>
      )}
    </>
  );
};
