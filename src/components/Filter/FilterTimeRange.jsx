import React, { useState } from 'react';
import { Card, Button, Row, Col, InputNumber, Form } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useEffect } from 'react';

// https://lubrytics.com:8443/nadh-api-crm/api/users?page=1&perPage=10

export const FilterTimeRange = ({ paramOne, paramTwo }) => {
  const [form] = Form.useForm();
  const [checkSearch, setCheckSearch] = useState(false);
  const [checkParseValueFrom, setCheckParseValueFrom] = useState(false);
  const [valueFrom, setValueFrom] = useState();
  const [checkParseValueTo, setCheckParseValueTo] = useState(false);
  const [valueTo, setValueTo] = useState();
  const [checkValidateFrom, setCheckValidateFrom] = useState(false);
  const [checkValidateTo, setCheckValidateTo] = useState(false);

  const handleSearch = () => {
    console.log('from', form.getFieldValue('value_from'));
    console.log('to', form.getFieldValue('value_to'));
  };

  const handleParserValueFrom = (value) => {
    if (value === '') {
      setCheckSearch(false);
      setCheckValidateFrom(false);
      setCheckParseValueFrom(false);
      setValueFrom('');
      setCheckValidateTo(false);
      return '';
    }

    if (isNaN(value)) {
      setCheckValidateFrom(false);
      setCheckParseValueFrom(true);
      setValueFrom(value);
      setCheckSearch(true);
      return value;
    } else {
      if (Number(value) > valueTo && value !== undefined && valueTo !== '') {
        setCheckSearch(true);
        setCheckValidateFrom(true);
      } else {
        setCheckSearch(false);
        setCheckValidateFrom(false);
      }

      setCheckParseValueFrom(false);
      return Number(value);
    }
  };

  const handleParserValueTo = (value) => {
    if (value === '') {
      setCheckSearch(false);
      setCheckValidateTo(false);
      setCheckParseValueTo(false);
      setCheckValidateFrom(false);
      setValueTo('');
      return '';
    }

    if (isNaN(value)) {
      setCheckParseValueTo(true);
      setValueTo(value);
      setCheckSearch(true);
      return value;
    } else {
      if (Number(value) < valueFrom && value !== undefined) {
        setCheckSearch(true);
        setCheckValidateTo(true);
      } else {
        setCheckSearch(false);
        setCheckValidateTo(false);
      }

      setCheckParseValueTo(false);
      return Number(value);
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
                <Form.Item>
                  <InputNumber
                    onChange={setValueFrom}
                    value={valueFrom}
                    min={1}
                    parser={handleParserValueFrom}
                    type="string"
                    placeholder="To"
                    style={{
                      width: '100%',
                      borderRadius: '0px',
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item>
                  <InputNumber
                    onChange={setValueTo}
                    value={valueTo}
                    min={1}
                    parser={handleParserValueTo}
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
            <Row gutter={[8, 8]}>
              <Col span={12}>
                {checkParseValueFrom && (
                  <span style={{ color: 'red' }}>Must be number</span>
                )}
                {checkValidateFrom && (
                  <span style={{ color: 'red' }}>
                    Must be lower than to value
                  </span>
                )}
              </Col>
              <Col span={12}>
                {checkParseValueTo && (
                  <span style={{ color: 'red' }}>Must be number</span>
                )}
                {checkValidateTo && (
                  <span style={{ color: 'red' }}>
                    Must be higher than from's value
                  </span>
                )}
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
                  onClick={handleSearch}
                >
                  Search
                </Button>
              </Col>
              <Col span={12}>
                <Button
                  size="small"
                  style={{ width: '100%', borderRadius: '0px' }}
                  onClick={handleSearch}
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
