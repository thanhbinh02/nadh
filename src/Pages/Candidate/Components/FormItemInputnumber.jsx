import React from 'react';
import { Form, InputNumber } from 'antd';
import { useDispatch } from 'react-redux';

export const FormItemInputNumber = ({
  label,
  name,
  actionDispatch,
  defaultValue,
  check,
}) => {
  const dispatch = useDispatch();

  const handleBlur = (e) => {
    dispatch(actionDispatch({ value: Number(e.target.value), label: name }));
  };

  return (
    <Form.Item label={label} name={name}>
      <InputNumber
        min="0"
        onBlur={handleBlur}
        placeholder="0"
        style={{ width: '100%' }}
        defaultValue={defaultValue}
        disabled={check}
      />
    </Form.Item>
  );
};
