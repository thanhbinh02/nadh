import React from 'react';
import { Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

export const FormItemInputText = ({
  label,
  name,
  placeholder,
  required,
  message,
  actionDispatch,
}) => {
  const dispatch = useDispatch();

  const handleBlur = (e) => {
    dispatch(actionDispatch({ value: e.target.value, label: name }));
  };

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
          <Input placeholder={placeholder} onBlur={handleBlur} />
        </Form.Item>
      ) : (
        <Form.Item label={label} name={name}>
          <Input placeholder={placeholder} onBlur={handleBlur} />
        </Form.Item>
      )}
    </>
  );
};
