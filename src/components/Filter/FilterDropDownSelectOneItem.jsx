import React from 'react';
import { Card, Button, Row, Col, Select, Form } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

export const FilterDropDownSelectOneItem = ({
  placeholder,
  mode,
  options,
  param,
  fetchData,
}) => {
  const { Option } = Select;
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onFinish = () => {
    const data = { name: param, data: form.getFieldValue(`${param}`) };
    if (mode !== 'multiple' || data.data === undefined) {
      const result = { [data.name]: data.data };
      const dataSaveLocal = JSON.parse(localStorage.getItem('filterCDD'));
      const newData = { ...dataSaveLocal, ...result, page: 1 };
      dispatch(fetchData(newData));
    } else {
      const result = { [data.name]: data.data.join(',') };
      const dataSaveLocal = JSON.parse(localStorage.getItem('filterCDD'));
      const newData = { ...dataSaveLocal, ...result, page: 1 };
      dispatch(fetchData(newData));
    }
  };

  return (
    <Card
      size="small"
      style={{
        width: 200,
      }}
    >
      <Form form={form} onFinish={onFinish}>
        <Row gutter={[8, 8]}>
          <Col span={12}>
            <Button size="small" style={{ width: '100%', borderRadius: '0px' }}>
              Reset
            </Button>
          </Col>
          <Col span={12}>
            <Form.Item>
              <Button
                type="primary"
                size="small"
                style={{ width: '100%', borderRadius: '0px' }}
                icon={<SearchOutlined />}
                htmlType="submit"
              >
                Search
              </Button>
            </Form.Item>
          </Col>
          <Col span={24}>
            {/* <Form.Item name={param}>
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
                      value={option.id}
                      label={option.label}
                    >
                      {option.label}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item> */}
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
                      value={option.id}
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
