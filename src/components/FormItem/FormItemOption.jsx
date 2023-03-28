import { Select, Form } from 'antd';

const { Option } = Select;

export const FormItemOption = ({
  options,
  name,
  label,
  placeholder,
  required,
  message,
  allowClear,
}) => {
  return (
    <Form.Item
      name={name}
      label={label}
      required={required}
      rules={
        message && [
          {
            required: true,
            message: message,
          },
        ]
      }
    >
      <Select
        allowClear={allowClear}
        showSearch
        style={{ width: '100%' }}
        placeholder={placeholder}
        optionFilterProp="children"
      >
        {options?.map((option) => {
          return (
            <Option key={option.key} value={option.key} label={option.label}>
              {option.label}
            </Option>
          );
        })}
      </Select>
    </Form.Item>
  );
};
