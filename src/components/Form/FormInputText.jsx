import React from 'react';
import { Input, Form } from 'antd';

export const FormInputText = ({ required, label, name, placeholder }) => {
  return (
    <Form.Item label={label} required={required} name={name}>
      <Input placeholder={placeholder} />
    </Form.Item>
  );
};
