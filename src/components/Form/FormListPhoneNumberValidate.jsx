import React from 'react';

import { MinusCircleOutlined } from '@ant-design/icons';
import { Form, Select, Row, Col, Input } from 'antd';

const { Option } = Select;

const onValuesChangeForm = (form, fields) => {
  let arrNumber = [];
  fields.reduce((result, item, index) => {
    const isTouchedNumber = form.isFieldTouched(['phones', index, 'number']);
    if (
      isTouchedNumber &&
      form.getFieldValue(['phones', index, 'number']) !== undefined
    ) {
      arrNumber.push(['phones', index, 'number']);
    }
    return result;
  }, []);

  form.validateFields(arrNumber);
};

const FormListPhoneNumberValidate = ({
  name,
  form,
  remove,
  fields,
  isListField,
  phoneNumber,
  disabled,
}) => {
  console.log('disabled', disabled);

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
            <Option
              key={option.key}
              value={option.key}
              label={option.label}
              disabled={disabled}
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

  const checkAddressExactly = (name) => {
    for (let i = 0; i < fields.length; i++) {
      if (
        name !== i &&
        form.getFieldValue(['phones', name, 'number']) !== undefined &&
        // eslint-disable-next-line no-self-compare
        form.getFieldValue(['phones', i, 'phone_code']) ===
          form.getFieldValue(['phones', name, 'phone_code']) &&
        form.getFieldValue(['phones', i, 'number']) ===
          form.getFieldValue(['phones', name, 'number'])
      ) {
        return false;
      }
    }
    return true;
  };

  const handleNumberChange = (value, option, name) => {
    onValuesChangeForm(form, form.getFieldValue('phones'));
  };

  const handleRemove = () => {
    onValuesChangeForm(form, form.getFieldValue('phones'));
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
                () => ({
                  validator(_, value) {
                    if (checkAddressExactly(name)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('Phone number is not the same'),
                    );
                  },
                }),
              ]}
            >
              <Input
                addonBefore={prefixSelector}
                style={{
                  width: '100%',
                }}
                onChange={(value, option) =>
                  handleNumberChange(value, option, name)
                }
                disabled={disabled}
              />
            </Form.Item>
          </Col>

          <Col span={3}>
            {fields.length > 1 && (
              <>{!disabled && <MinusCircleOutlined onClick={handleRemove} />}</>
            )}
          </Col>
        </Row>
      </Input.Group>
    </Form.Item>
  );
};

export default FormListPhoneNumberValidate;
