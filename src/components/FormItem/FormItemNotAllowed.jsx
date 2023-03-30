import { Form } from 'antd';
export const FormItemNotAllowed = ({ label, value, textTransform }) => {
  return (
    <Form.Item
      label={label}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      labelAlign="left"
      colon={false}
    >
      <p
        style={{
          cursor: 'not-allowed',
          color: 'rgba(0,0,0,.65)',
          textTransform: { textTransform },
        }}
      >
        {value}
      </p>
    </Form.Item>
  );
};
