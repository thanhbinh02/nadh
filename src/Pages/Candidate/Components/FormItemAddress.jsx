import React from 'react';
import FormListAddress from '../../../components/Form/FormListAddress';
import { Form, Button, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export const FormItemAddress = ({ form, countries, listCountry }) => {
  return (
    <Form.Item label="Address">
      <Form.List name="addresses" initialValue={[{}]}>
        {(fields, { add, remove }) => {
          return (
            <>
              {fields.map(({ key, name, isListField }) => {
                return (
                  <FormListAddress
                    key={key}
                    name={name}
                    form={form}
                    fieldKey={key}
                    remove={remove}
                    fields={fields}
                    isListField={isListField}
                    listCountry={listCountry}
                  />
                );
              })}

              <>
                {fields.length < 5 && (
                  <Col span={14} offset={6}>
                    <Form.Item>
                      <Button
                        onClick={() => {
                          add();
                        }}
                        block
                        icon={<PlusOutlined />}
                        type="primary"
                        ghost
                      >
                        Add address
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
