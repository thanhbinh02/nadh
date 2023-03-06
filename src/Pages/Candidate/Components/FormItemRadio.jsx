import React from 'react';
import { Form, Radio } from 'antd';
import { useDispatch } from 'react-redux';

export const FormItemRadio = ({ label, name, options, actionDispatch }) => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(actionDispatch({ value: e.target.value, label: name }));
  };

  return (
    <Form.Item label={label} name={name}>
      <Radio.Group onChange={handleChange}>
        {options?.map((gender) => (
          <Radio value={gender.key} key={gender.key}>
            {gender.label}
          </Radio>
        ))}
      </Radio.Group>
    </Form.Item>
  );
};