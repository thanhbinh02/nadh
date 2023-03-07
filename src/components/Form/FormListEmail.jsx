import { MinusCircleOutlined } from '@ant-design/icons';
import { Form, Row, Col, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { putDataCandidateEmail } from '../../store/createCandidateSlice';

const FormListEmail = ({
  name,
  form,
  remove,
  fields,
  isListField,
  disabled,
}) => {
  const { getFieldValue } = form;
  const dispatch = useDispatch();

  const dispatchValueEmail = () => {
    const listEmail = getFieldValue('emails');

    if (listEmail.length === 1) {
      const result = [listEmail[0].email];
      dispatch(putDataCandidateEmail(result));
    }
    if (listEmail.length > 1) {
      const result = listEmail.map((obj) => obj?.email);
      dispatch(putDataCandidateEmail(result));
    }
  };

  const handleRemove = () => {
    remove(name);
    dispatchValueEmail();
  };

  const handleBlur = (e) => {
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
                onBlur={handleBlur}
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
