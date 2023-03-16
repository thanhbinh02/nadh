import React from 'react';
import { Form, Radio } from 'antd';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

export const FormItemRadio = ({
  label,
  name,
  options,
  actionDispatch,
  defaultValue,
  check,
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
    form.setFieldValue(name, defaultValue);
  }, []);

  return (
    <Form.Item label={label} name={name}>
      <Radio.Group onChange={handleChange} disabled={check}>
        {options?.map((gender) => (
          <Radio value={gender.key} key={gender.key}>
            {gender.label}
          </Radio>
        ))}
      </Radio.Group>
    </Form.Item>
  );
};
