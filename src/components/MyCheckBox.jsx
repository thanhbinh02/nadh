import React from 'react';
import { useState } from 'react';
import Checkbox from 'antd/es/checkbox/Checkbox';
import { addItemColumn } from '../store/customColumnSlice';
import { useDispatch } from 'react-redux';
import { refreshCandidates } from '../store/candidatesSlice';
import { getTagsCandidates } from '../store/tagsCandidatesSlice';

export const MyCheckBox = ({ item, check }) => {
  const dispatch = useDispatch();
  const [myCheck, setMyCheck] = useState(check);

  const handleDispatchCustomColumnRange = (paramFrom, paramTo) => {
    const filterSaveLocalStorage = JSON.parse(
      localStorage.getItem('filterCDD'),
    );
    const propsToDelete = [paramFrom, paramTo];
    propsToDelete.forEach((prop) => delete filterSaveLocalStorage[prop]);
    const newObj = { ...filterSaveLocalStorage, page: 1 };
    console.log(newObj);
    window.localStorage.setItem('filterCDD', JSON.stringify(newObj));
    dispatch(refreshCandidates(newObj));
    dispatch(getTagsCandidates(newObj));
  };

  const handleDispatchCustomColumnType = (param) => {
    const filterSaveLocalStorage = JSON.parse(
      localStorage.getItem('filterCDD'),
    );
    delete filterSaveLocalStorage[param];
    const newObj = { ...filterSaveLocalStorage, page: 1 };
    window.localStorage.setItem('filterCDD', JSON.stringify(newObj));
    dispatch(refreshCandidates(newObj));
    dispatch(getTagsCandidates(newObj));
  };

  const handleDispatchCustomCheckFalse = () => {
    const filterSaveLocalStorage = JSON.parse(
      localStorage.getItem('filterCDD'),
    );
    const newObj = { ...filterSaveLocalStorage, page: 1 };
    dispatch(refreshCandidates(newObj));
    dispatch(getTagsCandidates(newObj));
  };

  return (
    <Checkbox
      id={item.title}
      onClick={(e) => e.stopPropagation()}
      onChange={(e) => {
        setMyCheck(!myCheck);
        console.log('myCheck', myCheck);
        console.log('title', item.title);
        const filterSaveLocalStorage = JSON.parse(
          localStorage.getItem('filterCDD'),
        );

        if (item.title === 'priority_status' && myCheck === true) {
          handleDispatchCustomColumnType('priority_status');
        }

        if (item.title === 'priority_status' && myCheck === false) {
          handleDispatchCustomCheckFalse();
        }

        if (item.title === 'language' && myCheck === true) {
          handleDispatchCustomColumnType('language');
        }

        if (item.title === 'language' && myCheck === false) {
          handleDispatchCustomCheckFalse();
        }

        if (item.title === 'location' && myCheck === true) {
          if (filterSaveLocalStorage?.location?.countryCity) {
            const {
              location: { countryCity, ...restCountry },
              ...rest
            } = filterSaveLocalStorage;
            const result = { ...rest, location: { ...restCountry } };

            const propsToDelete = ['country', 'city'];
            propsToDelete.forEach((prop) => delete result[prop]);
            const newObj = { ...result, page: 1 };
            window.localStorage.setItem('filterCDD', JSON.stringify(newObj));
            dispatch(refreshCandidates(newObj));
            dispatch(getTagsCandidates(newObj));
          }
        }

        if (item.title === 'location' && myCheck === false) {
          handleDispatchCustomCheckFalse();
        }

        if (item.title === 'industry' && myCheck === true) {
          if (filterSaveLocalStorage?.location?.industries) {
            const {
              location: { industries, ...restCountry },
              ...rest
            } = filterSaveLocalStorage;
            const result = { ...rest, location: { ...restCountry } };
            const propsToDelete = ['industry_id', 'industry_type'];
            propsToDelete.forEach((prop) => delete result[prop]);
            const newObj = { ...result, page: 1 };
            window.localStorage.setItem('filterCDD', JSON.stringify(newObj));
            dispatch(refreshCandidates(newObj));
            dispatch(getTagsCandidates(newObj));
          }
        }

        if (item.title === 'industry' && myCheck === false) {
          handleDispatchCustomCheckFalse();
        }

        if (item.title === 'yob' && myCheck === true) {
          handleDispatchCustomColumnRange('yob_from', 'yob_to');
        }

        if (item.title === 'yob' && myCheck === false) {
          handleDispatchCustomCheckFalse();
        }

        if (item.title === 'current_company' && myCheck === true) {
          handleDispatchCustomColumnType('current_company_text');
        }

        if (item.title === 'current_company' && myCheck === false) {
          handleDispatchCustomCheckFalse();
        }

        if (item.title === 'current_position' && myCheck === true) {
          handleDispatchCustomColumnType('current_position_text');
        }

        if (item.title === 'current_position' && myCheck === false) {
          handleDispatchCustomCheckFalse();
        }

        if (item.title === 'flow_status' && myCheck === true) {
          handleDispatchCustomColumnType('flow_status');
        }

        if (item.title === 'flow_status' && myCheck === false) {
          handleDispatchCustomCheckFalse();
        }

        if (item.title === 'industry_years' && myCheck === true) {
          handleDispatchCustomColumnRange(
            'industry_years_from',
            'industry_years_to',
          );
        }

        if (item.title === 'industry_years' && myCheck === false) {
          handleDispatchCustomCheckFalse();
        }

        if (item.title === 'management_years' && myCheck === true) {
          handleDispatchCustomColumnRange(
            'management_years_from',
            'management_years_to',
          );
        }

        if (item.title === 'management_years' && myCheck === false) {
          handleDispatchCustomCheckFalse();
        }

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
