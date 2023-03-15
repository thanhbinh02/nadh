import React from 'react';
import { getTagsCandidates } from '../../store/tagsCandidatesSlice';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { refreshCandidates } from '../../store/candidatesSlice';

const checkOneName = (name, obj) => {
  if (obj) {
    if (name in obj) {
      return true;
    } else {
      return false;
    }
  }
};

const checkTwoName = (names, obj) => {
  if (obj) {
    for (let i = 0; i < names.length; i++) {
      if (names[i] in obj) {
        return true;
      }
    }
    return false;
  }
  return false;
};

export const ButtonReset = ({ param, paramFrom, paramTo, form }) => {
  const dispatch = useDispatch();

  const handleReset = () => {
    if (
      param !== undefined &&
      paramFrom === undefined &&
      paramTo === undefined
    ) {
      const filterSaveLocalStorage = JSON.parse(
        localStorage.getItem('filterCDD'),
      );
      if (checkOneName(param, filterSaveLocalStorage)) {
        delete filterSaveLocalStorage[param];
        const newObj = { ...filterSaveLocalStorage, page: 1 };
        window.localStorage.setItem('filterCDD', JSON.stringify(newObj));
        dispatch(refreshCandidates(newObj));
        dispatch(getTagsCandidates(newObj));
      } else {
        form.setFieldValue(param, undefined);
        dispatch(refreshCandidates());
      }
    }

    if (
      param === undefined &&
      paramFrom !== undefined &&
      paramTo !== undefined
    ) {
      const filterSaveLocalStorage = JSON.parse(
        localStorage.getItem('filterCDD'),
      );
      if (checkTwoName([paramFrom, paramTo], filterSaveLocalStorage)) {
        const propsToDelete = [paramFrom, paramTo];
        propsToDelete.forEach((prop) => delete filterSaveLocalStorage[prop]);
        const newObj = { ...filterSaveLocalStorage };
        dispatch(refreshCandidates(newObj));
        dispatch(getTagsCandidates(newObj));
      } else {
        form.setFieldValue(paramFrom, undefined);
        form.setFieldValue(paramTo, undefined);
        dispatch(refreshCandidates());
      }
    }
  };

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
