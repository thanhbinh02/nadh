import React from 'react';
import FormListEmail from '../../../components/Form/FormListEmail';
import { Form, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect } from 'react';

export const FormItemEmail = ({ form, defaultValue, check }) => {
  useEffect(() => {
    if (defaultValue) {
      for (let i = 0; i < defaultValue.length; i++) {
        form.setFieldValue(['emails', i, 'email'], defaultValue[i]);
      }
    }
  }, []);

  return (
    <Form.Item label="Email" required>
      <Form.List name="emails" initialValue={[{}]}>
        {(fields, { add, remove }) => {
          return (
            <>
              {fields.map(({ key, name, isListField }) => {
                return (
                  <FormListEmail
                    key={key}
                    name={name}
                    fieldKey={key}
                    form={form}
                    remove={remove}
                    fields={fields}
                    isListField={isListField}
                    defaultValue={defaultValue}
                    disabled={check}
                  />
                );
              })}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                  disabled={check}
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
