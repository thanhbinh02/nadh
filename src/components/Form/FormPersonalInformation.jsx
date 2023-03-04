import { Select, Form, Input, Row, Col } from 'antd';
import { useState } from 'react';
import { priority_status, DATES, MONTHS } from '../../utils/const';

const FormPersonalInformation = () => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const yearsRange = [];
  for (var i = 1960; i <= 2023; i++) {
    yearsRange.push({ key: i });
  }

  return (
    <Form form={form} layout="vertical">
      <Row gutter={(12, 12)}>
        <Col span={12}>
          <Form.Item label="First Name" required name="first_name">
            <Input placeholder="Please Input First Name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Last Name" required name="last_name">
            <Input placeholder="Please Input Last Name" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={(12, 12)}>
        <Col span={12}>
          <Form.Item label="Middle Name" name="middle_name">
            <Input placeholder="Please Input Middle Name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="priority_status" label="Primary status">
            <Select
              style={{ width: '100%', borderRadius: '0px' }}
              placeholder="Please Select Priority Status"
              optionFilterProp="children"
            >
              {priority_status.map((option) => {
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

      <Form.Item label="Birthday">
        <Row gutter={(12, 12)}>
          <Col span={4}>
            <Form.Item name="date_birthday">
              <Select
                allowClear
                showSearch
                style={{ width: '100%', borderRadius: '0px' }}
                placeholder="Date"
              >
                {DATES.map((option) => {
                  return (
                    <Option key={option.key} value={option.key}>
                      {option.key}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name="month_birthday">
              <Select
                allowClear
                showSearch
                style={{ width: '100%', borderRadius: '0px' }}
                placeholder="Month"
                optionFilterProp="children"
              >
                {MONTHS.map((option) => {
                  return (
                    <Option key={option.key} value={option.key}>
                      {option.label}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item name="year_birthday">
              <Select
                allowClear
                showSearch
                style={{ width: '100%', borderRadius: '0px' }}
                placeholder="Year"
                optionFilterProp="children"
              >
                {yearsRange.map((option) => {
                  return (
                    <Option key={option.key} value={option.key}>
                      {option.key}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};
export default FormPersonalInformation;
