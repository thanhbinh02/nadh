import React from 'react';
import { Form, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import FormListPhoneNumber from '../../../components/Form/FormListPhoneNumber';

export const FormItemPhone = ({ form, phoneNumber }) => {
  return (
    <Form.Item label="Mobile Phone*">
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
                  />
                );
              })}
              <Form.Item style={{ marginTop: '12px' }}>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add field
                </Button>
              </Form.Item>
            </>
          );
        }}
      </Form.List>
    </Form.Item>
  );
};
