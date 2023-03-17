import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Card, Row, Col, Select, Form } from 'antd';

import { getTagsCandidates } from '../../store/tagsCandidatesSlice';
import { FilterResetSearch } from './FilterResetSearch';

const convertStringToArray = (string) => {
  let arr = string?.split(',').map(function (item) {
    return parseInt(item, 10);
  });
  return arr;
};

export const FilterDropDownSelectOneItem = ({
  placeholder,
  mode,
  options,
  param,
  fetchData,
  keyPage,
  filterValue,
}) => {
  const { Option } = Select;
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    if (mode) {
      form.setFieldValue(`${param}`, convertStringToArray(filterValue));
    } else {
      form.setFieldValue(`${param}`, filterValue);
    }
  }, [filterValue]);

  const handleSearch = () => {
    const data = { name: param, data: form.getFieldValue(`${param}`) };
    if (mode !== 'multiple' || data.data === undefined) {
      const result = { [data.name]: data.data };
      const dataSaveLocal = JSON.parse(localStorage.getItem(keyPage));
      const newData = { ...dataSaveLocal, ...result, page: 1 };
      dispatch(fetchData(newData));
      dispatch(getTagsCandidates(newData));
    } else {
      const result = { [data.name]: data.data.join(',') };
      const dataSaveLocal = JSON.parse(localStorage.getItem(keyPage));
      const newData = { ...dataSaveLocal, ...result, page: 1 };
      dispatch(fetchData(newData));
      dispatch(getTagsCandidates(newData));
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
          <FilterResetSearch onClick={handleSearch} param={param} form={form} />
          <Col span={24}>
            <Form.Item name={param}>
              <Select
                mode={mode}
                allowClear
                style={{ width: '100%', borderRadius: '0px' }}
                placeholder={placeholder}
                optionFilterProp="children"
              >
                {options.map((option) => {
                  return (
                    <Option
                      key={option.key}
                      value={option.key}
                      label={option.label}
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
