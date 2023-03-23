import { Form, Radio } from 'antd';

export const FormItemRadio = ({ label, name, options }) => {
  return (
    <Form.Item label={label} name={name}>
      <Radio.Group>
        {options?.map((gender) => (
          <Radio value={gender.key} key={gender.key}>
            {gender.label}
          </Radio>
        ))}
      </Radio.Group>
    </Form.Item>
  );
};
