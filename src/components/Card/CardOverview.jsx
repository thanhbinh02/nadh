import { Card } from 'antd';
import { Input } from 'antd';

const { TextArea } = Input;
export const CardOverview = () => {
  const onChange = (e) => {
    console.log('Change:', e.target.value);
  };

  return (
    <Card
      title="Overview"
      style={{
        width: '100%',
      }}
    >
      <TextArea
        showCount
        onChange={onChange}
        style={{
          height: 100,
          marginBottom: 24,
        }}
      />
    </Card>
  );
};
