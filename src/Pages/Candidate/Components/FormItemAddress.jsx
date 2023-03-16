import React, { useEffect } from 'react';
import FormListAddress from '../../../components/Form/FormListAddress';
import { Form, Button, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';

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
  setCancel,
  cancel,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (defaultValue) {
      for (let i = 0; i < defaultValue.length; i++) {
        form.setFieldValue(
          ['addresses', i, 'country'],
          defaultValue[i]?.country?.key || undefined,
        );
        form.setFieldValue(
          ['addresses', i, 'city'],
          defaultValue[i]?.city?.key || undefined,
        );
        form.setFieldValue(
          ['addresses', i, 'district'],
          defaultValue[i]?.district?.key || undefined,
        );
        form.setFieldValue(
          ['addresses', i, 'address'],
          defaultValue[i]?.address || undefined,
        );
      }
    }
  }, []);

  useEffect(() => {
    if (cancel) {
      form.setFieldValue('addresses', undefined);
      // dispatch(actionDispatch({ value: defaultValue, label: 'addresses' }));

      if (defaultValue) {
        if (defaultValue.length === 0) {
          form.setFieldValue(['addresses', 0, 'country'], undefined);
        } else {
          for (let i = 0; i < defaultValue.length; i++) {
            form.setFieldValue(
              ['addresses', i, 'country'],
              defaultValue[i]?.country?.key || undefined,
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
      }
    }
  }, [cancel]);

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
                    defaultValue={defaultValue}
                    setCancel={setCancel}
                    cancel={cancel}
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
                          if (setCancel) {
                            setCancel(false);
                          }
                          let currentData = [
                            ...dataNewCandidate,
                            {
                              country: undefined,
                              city: undefined,
                              district: undefined,
                              address: undefined,
                            },
                          ];
                          dispatch(
                            actionDispatch({
                              value: currentData,
                              label: 'addresses',
                            }),
                          );
                        }}
                        block
                        icon={<PlusOutlined />}
                        disabled={check}
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
