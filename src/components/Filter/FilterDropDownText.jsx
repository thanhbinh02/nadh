import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Card, Row, Col, Input, Form } from 'antd';
import { FilterResetSearch } from './FilterResetSearch';

export const FilterDropDownText = ({
  placeholder,
  param,
  fetchData,
  keyPage,
  filterValue,
  getTags,
  changeDataDispatch,
}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const handleSearch = () => {
    const data = { name: param, data: form.getFieldValue(`${param}`) };
    const result = { [data.name]: data.data };
    const dataSaveLocal = JSON.parse(localStorage.getItem(keyPage));
    const newData = { ...dataSaveLocal, ...result, page: 1 };

    dispatch(fetchData(changeDataDispatch(newData)));
    dispatch(getTags(newData));
  };

  useEffect(() => {
    form.setFieldValue(`${param}`, filterValue);
  }, [filterValue]);

  return (
    <Card
      size="small"
      style={{
        width: 200,
      }}
    >
      <Form autoComplete="off" form={form}>
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
              <Input
                style={{ width: '100%', borderRadius: '0px' }}
                placeholder={placeholder}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};
