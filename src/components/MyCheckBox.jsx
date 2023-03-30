import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Checkbox } from 'antd';
import { addItemColumn } from '../store/customColumnSlice';

export const MyCheckBox = ({
  item,
  check,
  fetchData,
  changeDataDispatch,
  keyPage,
  getTags,
}) => {
  const dispatch = useDispatch();
  const [myCheck, setMyCheck] = useState(check);

  const handleCustom = (title) => {
    const dataSaveLocal = JSON.parse(localStorage.getItem(keyPage));

    if (title === 'client_jobs') {
      delete dataSaveLocal['client_jobs_from'];
      delete dataSaveLocal['client_jobs_to'];
    } else if (title === 'updated_on') {
      delete dataSaveLocal['updated_on_from'];
      delete dataSaveLocal['updated_on_to'];
    } else if (title === 'quantity') {
      delete dataSaveLocal['quantity_from'];
      delete dataSaveLocal['quantity_to'];
    } else if (title === 'target_date') {
      delete dataSaveLocal['target_day_from'];
      delete dataSaveLocal['target_day_to'];
    } else if (title === 'end_date') {
      delete dataSaveLocal['end_day_from'];
      delete dataSaveLocal['end_day_to'];
    } else if (title === 'industry_year') {
      delete dataSaveLocal['industry_year_from'];
      delete dataSaveLocal['industry_year_to'];
    } else if (title === 'industry_years') {
      delete dataSaveLocal['industry_years_from'];
      delete dataSaveLocal['industry_years_to'];
    } else if (title === 'salary') {
      delete dataSaveLocal['salary_from'];
      delete dataSaveLocal['salary_to'];
    } else if (title === 'yob') {
      delete dataSaveLocal['yob_from'];
      delete dataSaveLocal['yob_to'];
    } else if (title === 'management_years') {
      delete dataSaveLocal['management_years_from'];
      delete dataSaveLocal['management_years_to'];
    } else {
      delete dataSaveLocal[title];
    }
    dispatch(fetchData(changeDataDispatch({ ...dataSaveLocal, page: 1 })));
    dispatch(getTags({ ...dataSaveLocal, page: 1 }));
  };

  return (
    <Checkbox
      id={item.title}
      onClick={(e) => e.stopPropagation()}
      onChange={(e) => {
        setMyCheck(!myCheck);

        if (myCheck === true) {
          handleCustom(item.title);
        } else {
          let newParam = JSON.parse(localStorage.getItem(keyPage));
          console.log('newParam', newParam);
          dispatch(fetchData(changeDataDispatch({ ...newParam, page: 1 })));
          dispatch(getTags({ ...newParam, page: 1 }));
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
