import { MinusCircleOutlined } from '@ant-design/icons';
import { Form, Row, Col, Input } from 'antd';

const onValuesChangeForm = (form, fields) => {
  let arrEmail = [];
  fields.reduce((result, item, index) => {
    const isTouchedEmail = form.isFieldTouched(['emails', index, 'email']);
    if (
      isTouchedEmail &&
      form.getFieldValue(['emails', index, 'email']) !== undefined
    ) {
      arrEmail.push(['emails', index, 'email']);
    }
    return result;
  }, []);

  form.validateFields(arrEmail);
};

const FormListEmailValidate = ({ name, form, remove, fields, isListField }) => {
  const checkAddressExactly = (name) => {
    for (let i = 0; i < fields.length; i++) {
      if (
        name !== i &&
        form.getFieldValue(['emails', name, 'email']) !== undefined &&
        form.getFieldValue(['emails', i, 'email']) ===
          form.getFieldValue(['emails', name, 'email'])
      ) {
        return false;
      }
    }
    return true;
  };

  const handleEmailChange = (value, option, name) => {
    onValuesChangeForm(form, form.getFieldValue('emails'));
  };

  const handleRemove = () => {
    onValuesChangeForm(form, form.getFieldValue('emails'));
    remove(name);
  };

  return (
    <Form.Item style={{ marginBottom: '12px' }}>
      <Input.Group>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              noStyle
              isListField={isListField}
              name={[name, 'email']}
              rules={[
                {
                  required: true,
                  message: 'Please input email',
                },
                () => ({
                  validator(_, value) {
                    if (checkAddressExactly(name)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Email is not the same'));
                  },
                }),
              ]}
            >
              <Input
                onChange={(value, option) =>
                  handleEmailChange(value, option, name)
                }
                placeholder="ex: email@gmail.com"
              ></Input>
            </Form.Item>
          </Col>
          <Col span={3}>
            {fields.length > 1 && (
              <MinusCircleOutlined onClick={handleRemove} />
            )}
          </Col>
        </Row>
      </Input.Group>
    </Form.Item>
  );
};

export default FormListEmailValidate;
