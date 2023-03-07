import { Form, Input, Button } from 'antd';
import { useState, useEffect } from 'react';

export const FormListExample = () => {
  const [form] = Form.useForm();
  const [defaultValues, setDefaultValues] = useState([
    { name: 'John', age: 20 },
    { name: 'Jane', age: 25 },
  ]);

  useEffect(() => {
    form.setFieldsValue({
      list: defaultValues.map((item, index) => ({ ...item, id: index })),
    });
  }, [defaultValues, form]);

  const onFinish = (values) => {
    console.log('Received values of form:', values);
  };

  return (
    <Form form={form} name="dynamic_form_item" onFinish={onFinish}>
      <Form.List name="list">
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((field) => (
                <div key={field.key}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'name']}
                    fieldKey={[field.fieldKey, 'name']}
                    rules={[{ required: true, message: 'Missing name' }]}
                  >
                    <Input placeholder="Name" />
                  </Form.Item>
                  <Form.Item
                    {...field}
                    name={[field.name, 'age']}
                    fieldKey={[field.fieldKey, 'age']}
                    rules={[{ required: true, message: 'Missing age' }]}
                  >
                    <Input placeholder="Age" />
                  </Form.Item>
                  <Button onClick={() => remove(field.name)}>Remove</Button>
                </div>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block>
                  Add field
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
