import { MinusCircleOutlined } from '@ant-design/icons';
import { Form, Row, Col, Input } from 'antd';

const FormListEmail = ({ name, form, remove, fields, isListField }) => {
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
                  message: 'Please input email',
                },
              ]}
            >
              <Input placeholder="ex: email@gmail.com"></Input>
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

export default FormListEmail;
