import React from 'react';
import FormListAddress from '../../../components/Form/FormListAddress';
import { Form, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export const FormItemAddress = ({ form, countries, cities, districts }) => {
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
                    fieldKey={key}
                    form={form}
                    remove={remove}
                    fields={fields}
                    isListField={isListField}
                    optionOne={countries}
                    optionTwo={cities}
                    optionThree={districts}
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
