import React from 'react';
import { Row, Col, Form, InputNumber } from 'antd';

export const FormItemExpectedSalary = ({ valueSelect }) => {
  return (
    <Row>
      <Col span={12}>
        <Form.Item name="salary_from" label={`From ${valueSelect.label}`}>
          <InputNumber
            min={0}
            style={{ width: '95%' }}
            formatter={(value) => {
              const str = value.toString();
              const decimalIndex = str.indexOf('.');
              const decimalPart =
                decimalIndex >= 0 ? str.slice(decimalIndex) : '';
              const integerPart =
                decimalIndex >= 0 ? str.slice(0, decimalIndex) : str;
              const formattedIntegerPart = integerPart
                .split('')
                .reverse()
                .map((char, index) => {
                  if (index > 0 && index % 3 === 0) {
                    return `${char},`;
                  }
                  return char;
                })
                .reverse()
                .join('');
              return `${formattedIntegerPart}${decimalPart}`;
            }}
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
            precision={2}
          ></InputNumber>
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name="salary_to" label={`To ${valueSelect.label}`}>
          <InputNumber
            min={0}
            style={{ width: '95%' }}
            formatter={(value) => {
              const str = value.toString();
              const decimalIndex = str.indexOf('.');
              const decimalPart =
                decimalIndex >= 0 ? str.slice(decimalIndex) : '';
              const integerPart =
                decimalIndex >= 0 ? str.slice(0, decimalIndex) : str;
              const formattedIntegerPart = integerPart
                .split('')
                .reverse()
                .map((char, index) => {
                  if (index > 0 && index % 3 === 0) {
                    return `${char},`;
                  }
                  return char;
                })
                .reverse()
                .join('');
              return `${formattedIntegerPart}${decimalPart}`;
            }}
            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
            precision={2}
          ></InputNumber>
        </Form.Item>
      </Col>
    </Row>
  );
};
