import React from 'react';
import FormListEmail from '../../../components/Form/FormListEmail';
import { Form, Button, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect } from 'react';

export const FormItemEmail = ({
  form,
  defaultValue,
  check,
  putCandidateEmail,
  setOpen,
}) => {
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
                    putCandidateEmail={putCandidateEmail}
                    setOpen={setOpen}
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
