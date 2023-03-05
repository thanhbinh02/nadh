import React from 'react';
import FormListEmail from '../../../components/Form/FormListEmail';
import { Form, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export const FormItemEmail = ({ form }) => {
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
                  />
                );
              })}
              <Form.Item>
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

const a = [
  { email: '45e@gmail.com' },
  { email: 'rrr@gmail.com' },
  { email: '231@gmail.com' },
];

const b = ['45e@gmail.com', 'rrr@gmail.com', '231@gmail.com'];
