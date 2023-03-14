import React, { useEffect } from 'react';
import { Form, Input } from 'antd';
import { useDispatch } from 'react-redux';

export const FormItemInputText = ({
  label,
  name,
  placeholder,
  required,
  message,
  actionDispatch,
  defaultValue,
  form,
  setOpen,
}) => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
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
              message: { message },
            },
          ]}
        >
          <Input placeholder={placeholder} onChange={handleChange} />
        </Form.Item>
      ) : (
        <Form.Item label={label} name={name}>
          <Input placeholder={placeholder} onChange={handleChange} />
        </Form.Item>
      )}
    </>
  );
};
