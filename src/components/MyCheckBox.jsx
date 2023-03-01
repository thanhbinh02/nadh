import React from 'react';
import { useState } from 'react';
import Checkbox from 'antd/es/checkbox/Checkbox';
import { addItemColumn } from '../store/customColumnSlice';
import { useDispatch } from 'react-redux';

export const MyCheckBox = ({ item, check }) => {
  const dispatch = useDispatch();
  const [myCheck, setMyCheck] = useState(check);

  return (
    <Checkbox
      id={item.title}
      onClick={(e) => e.stopPropagation()}
      onChange={(e) => {
        setMyCheck(!myCheck);

        dispatch(
          addItemColumn({
            myCheck: !myCheck,
            title: item.title,
          }),
        );
      }}
      checked={myCheck}
    >
      <span onClick={(e) => e.stopPropagation()}>{item.label}</span>
    </Checkbox>
  );
};
