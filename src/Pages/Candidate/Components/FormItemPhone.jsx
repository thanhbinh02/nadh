import React from 'react';
import { Form, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import FormListPhoneNumber from '../../../components/Form/FormListPhoneNumber';
import { useEffect } from 'react';

export const FormItemPhone = ({
  form,
  phoneNumber,
  defaultValue,
  putCandidateType,
  setOpen,
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
                    setOpen={setOpen}
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
