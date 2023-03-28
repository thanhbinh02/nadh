import { Form, Select } from 'antd';
import { useDispatch } from 'react-redux';

const { Option } = Select;
export const FormItemSelectMultiple = ({
  options,
  name,
  label,
  placeholder,
  form,
}) => {
  const handleChange = (value, option) => {
    if (value !== undefined) {
      form.setFieldValue(name, option);
    }
  };

  return (
    <Form.Item name={name} label={label}>
      <Select
        mode="multiple"
        allowClear
        style={{ width: '100%', borderRadius: '0px' }}
        optionFilterProp="children"
        onChange={handleChange}
        placeholder={placeholder}
      >
        {options.map((option) => {
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
