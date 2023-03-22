import React from 'react';
import FormListEmail from '../../../components/Form/FormListEmail';
import { Form, Button, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export const FormItemEmail = ({ form }) => {
  return (
    <Form.Item label="Email" required>
      <Form.List name="emails">
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

              <>
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
                        Add email
                      </Button>
                    </Form.Item>
                  </Col>
                )}
              </>
            </>
          );
        }}
      </Form.List>
    </Form.Item>
  );
};
