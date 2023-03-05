import { Select, Form } from 'antd';

const { Option, OptGroup } = Select;

function handleChange(value) {}

function FormSelectGroup({ data, name, label, placeholder }) {
  return (
    <Form.Item name={name} label={label}>
      <Select
        style={{ width: '100%', borderRadius: '0px' }}
        onChange={handleChange}
        mode="multiple"
        placeholder={placeholder}
      >
        {data?.map((options) => (
          <OptGroup label={options.label} key={options.key}>
            {options?.children?.map((item) => (
              <Option value={item.value} key={item.key}>
                {item.label}
              </Option>
            ))}
          </OptGroup>
        ))}
      </Select>
    </Form.Item>
  );
}

export default FormSelectGroup;
