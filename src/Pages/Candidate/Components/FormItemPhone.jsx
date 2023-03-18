import React from 'react';
import { Form, Button, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import FormListPhoneNumber from '../../../components/Form/FormListPhoneNumber';
import { useEffect } from 'react';

export const FormItemPhone = ({
  form,
  phoneNumber,
  defaultValue,
  putCandidateType,
  setCancel,
}) => {
  useEffect(() => {
    if (defaultValue) {
      for (let i = 0; i < defaultValue.length; i++) {
        form.setFieldValue(
          ['phones', i, 'phone_code'],
          defaultValue[i].phone_code.key,
        );
        form.setFieldValue(['phones', i, 'number'], defaultValue[i].number);
      }
    }
  }, []);

  return (
    <Form.Item label="Mobile Phone" required>
      <Form.List name="phones" initialValue={[{}]}>
        {(fields, { add, remove }) => {
          return (
            <>
              {fields.map(({ key, name, isListField }) => {
                return (
                  <FormListPhoneNumber
                    key={key}
                    name={name}
                    fieldKey={key}
                    form={form}
                    remove={remove}
                    fields={fields}
                    isListField={isListField}
                    phoneNumber={phoneNumber}
                    putCandidateType={putCandidateType}
                    setCancel={setCancel}
                  />
                );
              })}
              {fields.length < 5 && (
                <Col span={12} offset={6}>
                  <Form.Item>
                    <Button
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                      type="primary"
                      ghost
                    >
                      Add phone
                    </Button>
                  </Form.Item>
                </Col>
              )}
            </>
          );
        }}
      </Form.List>
    </Form.Item>
  );
};
