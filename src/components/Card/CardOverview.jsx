import { Card, Input, Form } from 'antd';

const { TextArea } = Input;

export const CardOverview = () => {
  return (
    <Card
      title="Overview"
      style={{
        width: '100%',
        marginBottom: '50px',
      }}
    >
      <Form.Item name="overview_text_new">
        <TextArea
          showCount
          style={{
            height: 100,
            marginBottom: 24,
          }}
        />
      </Form.Item>
    </Card>
  );
};
