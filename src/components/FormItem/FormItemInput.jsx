import { Form, InputNumber, Input } from 'antd';

export const FormItemInput = ({
  required,
  label,
  name,
  placeholder,
  message,
  type,
}) => {
  if (type === 'number') {
    return (
      <Form.Item label={label} name={name}>
        <InputNumber min="0" placeholder="0" style={{ width: '100%' }} />
      </Form.Item>
    );
  }

  if (type === 'people') {
    return (
      <>
        {required ? (
          <Form.Item
            label={label}
            required={required}
            name={name}
            rules={[
              {
                required: true,
                message: message,
              },
              {
                pattern: /^[\p{L}\s]+$/u,
                message: 'Please enter only alphanumeric characters',
              },
            ]}
          >
            <Input placeholder={placeholder} />
          </Form.Item>
        ) : (
          <Form.Item
            label={label}
            name={name}
            rules={[
              {
                pattern: /^[\p{L}\s]+$/u,
                message: 'Please enter only alphanumeric characters',
              },
            ]}
          >
            <Input placeholder={placeholder} />
          </Form.Item>
        )}
      </>
    );
  }

  if (type === 'text') {
    return (
      <Form.Item
        label={label}
        name={name}
        rules={
          message && [
            {
              required: true,
              message: message,
            },
          ]
        }
      >
        <Input placeholder={placeholder} />
      </Form.Item>
    );
  }

  if (type === 'email') {
    return (
      <Form.Item
        name={name}
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
        ]}
      >
        <Input placeholder="ex: email@gmail.com"></Input>
      </Form.Item>
    );
  }
};
