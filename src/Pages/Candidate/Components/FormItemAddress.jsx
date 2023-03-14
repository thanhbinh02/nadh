import React, { useEffect } from 'react';
import FormListAddress from '../../../components/Form/FormListAddress';
import { Form, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export const FormItemAddress = ({
  form,
  countries,
  cities,
  districts,
  actionDispatch,
  dataNewCandidate,
  defaultValue,
  check,
  setOpen,
}) => {
  useEffect(() => {
    if (defaultValue) {
      for (let i = 0; i < defaultValue.length; i++) {
        form.setFieldValue(
          ['addresses', i, 'country'],
          defaultValue[i]?.country?.label || undefined,
        );
        form.setFieldValue(
          ['addresses', i, 'city'],
          defaultValue[i]?.city?.label || undefined,
        );
        form.setFieldValue(
          ['addresses', i, 'district'],
          defaultValue[i]?.district?.label || undefined,
        );
        form.setFieldValue(
          ['addresses', i, 'address'],
          defaultValue[i]?.address || undefined,
        );
      }
    }
  }, []);

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
                    actionDispatch={actionDispatch}
                    dataNewCandidate={dataNewCandidate}
                    check={check}
                    setOpen={setOpen}
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
