import React from 'react';
import { Card, Button, Row, Col, Input, Form } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { addParam } from '../../store/paramsCandidatesSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { fetchParamsCandidates } from '../../store/paramsCandidatesSlice';
import { fetchCandidates } from '../../store/candidatesSlice';

export const FilterDropDownText = ({ placeholder, param }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleSearch = () => {
    const data = { name: param, data: form.getFieldValue(`${param}`) };

    const result = { [data.name]: data.data };
    const dataSaveLocal = JSON.parse(localStorage.getItem('filterCDD'));
    const newData = { ...dataSaveLocal, ...result, page: 1 };
    dispatch(fetchCandidates(newData));
  };

  return (
    <Card
      size="small"
      style={{
        width: 200,
      }}
    >
      <Form autoComplete="off" form={form}>
        <Row gutter={[8, 8]}>
          <Col span={12}>
            <Button size="small" style={{ width: '100%', borderRadius: '0px' }}>
              Reset
            </Button>
          </Col>
          <Form.Item>
            <Button
              type="primary"
              size="small"
              style={{ width: '100%', borderRadius: '0px' }}
              icon={<SearchOutlined />}
              onClick={handleSearch}
            >
              Search
            </Button>
          </Form.Item>
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
