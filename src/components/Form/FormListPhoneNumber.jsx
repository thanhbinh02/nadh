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
  form,
}) => {
  const handleBlur = (e) => {
    const formValue = form.getFieldValue('phones');
    const filterFormValue = formValue.filter((item) => item !== undefined);

    const result = filterFormValue.map((item) => {
      return {
        current: -1,
        number: item.number,
        phone_code: { key: item.phone_code ? item.phone_code : 1280 },
      };
    });

    console.log('result', result);
  };

  const prefixSelector = (
    <Form.Item name={[name, 'phone_code']} noStyle>
      <Select
        style={{ width: '120px', borderRadius: '0px' }}
        optionFilterProp="children"
        showSearch
        defaultValue={1280}
      >
        {phoneNumber.map((option) => {
          return (
            <Option key={option.key} value={option.key} label={option.label}>
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
        <Row gutter={16}>
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
                onBlur={handleBlur}
              />
            </Form.Item>
          </Col>

          <Col span={3}>
            {fields.length > 1 && (
              <MinusCircleOutlined onClick={handleRemove} />
            )}
          </Col>
        </Row>
      </Input.Group>
    </Form.Item>
  );
};

export default FormListPhoneNumber;
