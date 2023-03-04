import React from 'react';
import { getTagsCandidates } from '../../store/tagsCandidatesSlice';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { refreshCandidates } from '../../store/candidatesSlice';

export const ButtonReset = () => {
  const dispatch = useDispatch();
  return (
    <Button
      size="small"
      style={{ width: '100%', borderRadius: '0px' }}
      onClick={() => {
        dispatch(refreshCandidates());
        dispatch(
          getTagsCandidates({
            page: 1,
            perPage: 10,
          }),
        );
      }}
    >
      Reset
    </Button>
  );
};
