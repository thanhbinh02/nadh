import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Card, Row, Col, Select, Form } from 'antd';
import { FilterResetSearch } from './FilterResetSearch';
import { getKeyWithLabelArray, getKeyWithLabel } from '../../utils/const';

export const FilterDropDownSelectOneItem = ({
  placeholder,
  mode,
  options,
  param,
  fetchData,
  keyPage,
  filterValue,
  getTags,
  changeDataDispatch,
}) => {
  const { Option } = Select;
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    if (mode === 'multiple' && filterValue?.length !== 0) {
      if (param !== 'cpa') {
        form.setFieldValue(
          `${param}`,
          filterValue?.map((item) => item.key),
        );
      } else {
        form.setFieldValue(
          `${param}`,
          filterValue?.map((item) => Number(item.key)),
        );
      }
    } else {
      form.setFieldValue(`${param}`, filterValue?.key);
    }
  }, [filterValue]);

  const handleSearch = () => {
    const dataSaveLocal = JSON.parse(localStorage.getItem(keyPage));
    console.log('dataSaveLocal', dataSaveLocal);
    if (mode === 'multiple') {
      if (form.getFieldValue(`${param}`)?.length !== 0) {
        const newDataLocal = {
          ...dataSaveLocal,
          [`${param}`]: form.getFieldValue(`${param}`),
          page: 1,
        };

        dispatch(getTags(newDataLocal));
        dispatch(fetchData(changeDataDispatch(newDataLocal)));
      } else {
        delete dataSaveLocal[param];
        dispatch(fetchData(changeDataDispatch(dataSaveLocal)));
        dispatch(getTags(dataSaveLocal));
      }
    } else {
      if (form.getFieldValue(`${param}`) !== undefined) {
        const newDataLocal = {
          ...dataSaveLocal,
          [`${param}`]: form.getFieldValue(`${param}`),
          page: 1,
        };
        dispatch(getTags(newDataLocal));
        dispatch(fetchData(changeDataDispatch(newDataLocal)));
      } else {
        delete dataSaveLocal[param];
        dispatch(fetchData(changeDataDispatch(dataSaveLocal)));
        dispatch(getTags(dataSaveLocal));
      }
    }
  };

  const handleChange = (values, options) => {
    if (values !== undefined) {
      if (mode === 'multiple') {
        form.setFieldValue(`${param}`, getKeyWithLabelArray(options));
      } else {
        form.setFieldValue(`${param}`, getKeyWithLabel(options));
      }
    }
  };

  const handleClear = () => {
    if (mode === 'multiple') {
      form.setFieldValue(`${param}`, []);
    } else {
      form.setFieldValue(`${param}`, undefined);
    }
  };

  return (
    <Card
      size="small"
      style={{
        width: 200,
      }}
    >
      <Form form={form}>
        <Row gutter={[8, 8]}>
          <FilterResetSearch
            param={param}
            onClick={handleSearch}
            keyPage={keyPage}
            fetchData={fetchData}
            getTags={getTags}
            changeDataDispatch={changeDataDispatch}
          />
          <Col span={24}>
            <Form.Item name={param}>
              <Select
                mode={mode}
                allowClear
                style={{ width: '100%', borderRadius: '0px' }}
                placeholder={placeholder}
                optionFilterProp="children"
                onChange={(values, options) => handleChange(values, options)}
                onClear={handleClear}
              >
                {options.map((option) => {
                  return (
                    <Option
                      key={option.key}
                      value={option.key}
                      label={option.label}
                      style={{ textTransform: 'capitalize' }}
                    >
                      {option.label}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};
