import React, { useEffect } from 'react';
import { Form, InputNumber } from 'antd';
import { useDispatch } from 'react-redux';

export const FormItemInputNumber = ({
  label,
  name,
  actionDispatch,
  defaultValue,
  check,
  form,
  setOpen,
  setCancel,
}) => {
  const dispatch = useDispatch();

  const handleChange = (value) => {
    if (setCancel) {
      setCancel(false);
    }

    if (setOpen) {
      setOpen(true);
    }
    dispatch(actionDispatch({ value: value, label: name }));
  };

  useEffect(() => {
    form.setFieldValue(name, defaultValue);
  }, []);

  return (
    <Form.Item label={label} name={name}>
      <InputNumber
        min="0"
        onChange={handleChange}
        placeholder="0"
        style={{ width: '100%' }}
        disabled={check}
      />
    </Form.Item>
  );
};
