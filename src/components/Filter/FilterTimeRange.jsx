import React, { useState } from 'react';
import { Card, Button, Row, Col, InputNumber, Form } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useEffect } from 'react';

// https://lubrytics.com:8443/nadh-api-crm/api/users?page=1&perPage=10

export const FilterTimeRange = () => {
  const [form] = Form.useForm();
  const [checkSearch, setCheckSearch] = useState(true);

  const validation = (valueFrom, valueTo) => {
    if (valueFrom > valueTo || valueTo < valueFrom) {
      setCheckSearch(true);
    } else {
      setCheckSearch(false);
    }
  };

  return (
    <Card
      size="small"
      style={{
        width: 507,
      }}
    >
      <Form form={form}>
        <Row gutter={[16, 16]}>
          <Col span={14}>
            <Row gutter={[8, 8]}>
              <Col span={12}>
                <Form.Item
                  name="value_from"
                  rules={[
                    {
                      required: true,
                      message: 'Must be number',
                    },
                    {
                      pattern: new RegExp(/^[0-9]+$/),
                      message: 'Please input number',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        validation(value, getFieldValue('value_to'));
                        if (value > getFieldValue('value_to')) {
                          return Promise.reject(
                            new Error('Must be lower than to value'),
                          );
                        } else {
                          return Promise.resolve();
                        }
                      },
                    }),
                  ]}
                >
                  <InputNumber
                    type="string"
                    placeholder="From"
                    style={{
                      width: '100%',
                      borderRadius: '0px',
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="value_to"
                  rules={[
                    {
                      required: true,
                      message: 'Must be number',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        validation(getFieldValue('value_from'), value);
                        if (value < getFieldValue('value_from')) {
                          return Promise.reject(
                            new Error('Must be higher than from value'),
                          );
                        } else {
                          return Promise.resolve();
                        }
                      },
                    }),
                  ]}
                >
                  <InputNumber
                    type="string"
                    placeholder="To"
                    style={{
                      width: '100%',
                      borderRadius: '0px',
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
          <Col span={10}>
            <Row gutter={[8, 8]}>
              <Col span={12}>
                <Button
                  type="primary"
                  size="small"
                  style={{ width: '100%', borderRadius: '0px' }}
                  icon={<SearchOutlined />}
                  disabled={checkSearch}
                >
                  Search
                </Button>
              </Col>
              <Col span={12}>
                <Button
                  size="small"
                  style={{ width: '100%', borderRadius: '0px' }}
                >
                  Reset
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};
