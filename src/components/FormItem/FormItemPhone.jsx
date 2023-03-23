import { Form, Button, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import FormListPhoneNumber from '../Form/FormListPhoneNumber';

export const FormItemPhone = ({ form, phoneNumber }) => {
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
                  />
                );
              })}
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
                      Add phone
                    </Button>
                  </Form.Item>
                </Col>
              )}
            </>
          );
        }}
      </Form.List>
    </Form.Item>
  );
};
