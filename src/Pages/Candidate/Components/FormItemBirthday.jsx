import React from 'react';
import { Row, Col, Form, Select } from 'antd';
import { DATES, MONTHS } from '../../../utils/const';
import { useDispatch } from 'react-redux';

const { Option } = Select;
export const FormItemBirthday = ({ form, actionDispatch }) => {
  const dispatch = useDispatch();

  const yearsRange = [];
  for (var i = 1960; i <= 2023; i++) {
    yearsRange.push({ key: i });
  }

  const onChangeDate = () => {
    form.validateFields(['month_birthday', 'year_birthday']);
  };

  const onChangeMonth = () => {
    form.validateFields(['date_birthday', 'year_birthday']);
  };

  const onChangeYear = () => {
    form.validateFields(['date_birthday', 'month_birthday']);
  };

  return (
    <Form.Item label="Birthday" name="dob">
      <Row gutter={(12, 12)} style={{ marginBottom: '12px' }}>
        <Col span={4}>
          <Form.Item
            name="date_birthday"
            rules={[
              () => ({
                validator(_, value) {
                  if (
                    value ||
                    (!form.getFieldValue('month_birthday') &&
                      !form.getFieldValue('year_birthday'))
                  ) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error('Please select date'));
                },
              }),
            ]}
          >
            <Select
              allowClear
              showSearch
              style={{ width: '100%', borderRadius: '0px' }}
              placeholder="Date"
              onChange={onChangeDate}
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
          <Form.Item
            name="month_birthday"
            rules={[
              () => ({
                validator(_, value) {
                  if (
                    value ||
                    (!form.getFieldValue('date_birthday') &&
                      !form.getFieldValue('year_birthday'))
                  ) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error('Please select month'));
                },
              }),
            ]}
          >
            <Select
              allowClear
              showSearch
              style={{ width: '100%', borderRadius: '0px' }}
              placeholder="Month"
              optionFilterProp="children"
              onChange={onChangeMonth}
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
          <Form.Item
            name="year_birthday"
            rules={[
              () => ({
                validator(_, value) {
                  if (
                    value ||
                    (!form.getFieldValue('date_birthday') &&
                      !form.getFieldValue('month_birthday'))
                  ) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error('Please select year'));
                },
              }),
            ]}
          >
            <Select
              allowClear
              showSearch
              style={{ width: '100%', borderRadius: '0px' }}
              placeholder="Year"
              optionFilterProp="children"
              onChange={onChangeYear}
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
  );
};
