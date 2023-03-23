import { MinusCircleOutlined } from '@ant-design/icons';
import { Form, Row, Col, Input } from 'antd';

const FormListEmail = ({ name, remove, fields, isListField, disabled }) => {
  const handleRemove = () => {
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
                  message: 'Please input your E-mail!',
                },
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
              ]}
            >
              <Input
                placeholder="ex: email@gmail.com"
                disabled={disabled}
              ></Input>
            </Form.Item>
          </Col>
          <Col span={3}>
            {fields.length > 1 && (
              <MinusCircleOutlined
                onClick={handleRemove}
                style={{ color: 'red' }}
              />
            )}
          </Col>
        </Row>
      </Input.Group>
    </Form.Item>
  );
};

export default FormListEmail;
