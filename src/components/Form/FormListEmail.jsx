import { MinusCircleOutlined } from '@ant-design/icons';
import { Form, Row, Col, Input } from 'antd';
import { useDispatch } from 'react-redux';

const FormListEmail = ({
  name,
  form,
  remove,
  fields,
  isListField,
  disabled,
  putCandidateEmail,
  setOpen,
}) => {
  const { getFieldValue } = form;
  const dispatch = useDispatch();

  const dispatchValueEmail = () => {
    const listEmail = getFieldValue('emails');

    if (listEmail.length === 1) {
      const result = [listEmail[0]?.email];
      dispatch(putCandidateEmail(result));
    }
    if (listEmail.length > 1) {
      const result = listEmail.map((obj) => obj?.email);
      dispatch(putCandidateEmail(result));
    }
  };

  const handleRemove = () => {
    if (setOpen) {
      setOpen(true);
    }
    remove(name);
    dispatchValueEmail();
  };

  const handleChange = (e) => {
    if (setOpen) {
      setOpen(true);
    }
    dispatchValueEmail();
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
                onChange={handleChange}
                disabled={disabled}
              ></Input>
            </Form.Item>
          </Col>
          <Col span={3}>
            {fields.length > 1 && (
              <>{!disabled && <MinusCircleOutlined onClick={handleRemove} />}</>
            )}
          </Col>
        </Row>
      </Input.Group>
    </Form.Item>
  );
};

export default FormListEmail;
