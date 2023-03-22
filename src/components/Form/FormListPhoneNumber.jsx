import React from 'react';
import { MinusCircleOutlined } from '@ant-design/icons';
import { Form, Select, Row, Col, Input } from 'antd';

const { Option } = Select;

const FormListPhoneNumber = ({
  name,
  remove,
  fields,
  isListField,
  phoneNumber,
  disabled,
}) => {
  const prefixSelector = (
    <Form.Item name={[name, 'phone_code']} noStyle>
      <Select
        style={{ width: '120px', borderRadius: '0px' }}
        showSearch
        defaultValue={1280}
        optionFilterProp="customFilterProp"
      >
        {phoneNumber.map((option) => {
          const customFilterProp = `${option.label} ${option.extra.dial_code}`;

          return (
            <Option
              key={option.key}
              value={option.key}
              label={option.label}
              disabled={disabled}
              customFilterProp={customFilterProp}
            >
              <div>
                <img
                  src={`https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.4.3/flags/4x3/${option.extra.code.toLowerCase()}.svg`}
                  style={{
                    height: '1.1em',
                    width: '1.1em',
                    verticalAlign: 'middle',
                    display: 'inline-block',
                  }}
                />
                <span style={{ marginLeft: '8px' }}>
                  {option.extra.dial_code}
                </span>
              </div>
            </Option>
          );
        })}
      </Select>
    </Form.Item>
  );

  const handleRemove = () => {
    remove(name);
  };

  return (
    <Form.Item>
      <Input.Group>
        <Row gutter={16} style={{ marginBottom: '10px' }}>
          <Col span={12}>
            <Form.Item
              noStyle
              isListField={isListField}
              name={[name, 'number']}
              rules={[
                {
                  required: true,
                  message: 'Please type phone number',
                },
                {
                  pattern: new RegExp(/^[0-9]+$/),
                  message: 'Please input number',
                },
              ]}
            >
              <Input
                addonBefore={prefixSelector}
                style={{
                  width: '100%',
                }}
                disabled={disabled}
                placeholder="ex: 981234567"
              />
            </Form.Item>
          </Col>

          <Col span={3}>
            {fields.length > 1 && (
              <>
                {!disabled && (
                  <MinusCircleOutlined
                    onClick={handleRemove}
                    style={{ color: 'red' }}
                  />
                )}
              </>
            )}
          </Col>
        </Row>
      </Input.Group>
    </Form.Item>
  );
};

export default FormListPhoneNumber;

const abc = [
  'nguyenchicong2@gmail.com',
  'nguyenchicong1@gmail.com',
  'nguyenchicong0@gmail.com',
];

const result = [
  { email: 'nguyenchicong2@gmail.com' },
  { email: 'nguyenchicong1@gmail.com' },
  { email: 'nguyenchicong0@gmail.com' },
];
