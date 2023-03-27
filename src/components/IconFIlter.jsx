import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

const checkIconGlow = (name, obj) => {
  if (obj) {
    if (name in obj) {
      return true;
    } else {
      return false;
    }
  }
};

export const IconFIlter = ({ name, listFilter }) => {
  return (
    <>
      {checkIconGlow(name, listFilter) ? (
        <AiOutlineSearch
          style={{ color: 'rgb(24, 144, 255)', fontSize: '14px' }}
        />
      ) : (
        <AiOutlineSearch name={`Search ${name}`} style={{ fontSize: '14px' }} />
      )}
    </>
  );
};
