import React from 'react';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';

export const ButtonReset = ({ param, paramFrom, paramTo, form }) => {
  const dispatch = useDispatch();

  const handleReset = () => {};

  return (
    <Button
      size="small"
      style={{ width: '100%', borderRadius: '0px' }}
      onClick={handleReset}
    >
      Reset
    </Button>
  );
};
