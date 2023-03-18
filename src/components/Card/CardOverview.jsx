import { Card, Input, Form } from 'antd';
import { useDispatch } from 'react-redux';

const { TextArea } = Input;

export const CardOverview = ({ putCandidateType }) => {
  const dispatch = useDispatch();

  const onChange = (e) => {
    dispatch(
      putCandidateType({ value: e.target.value, label: 'overview_text_new' }),
    );
  };

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
          onChange={onChange}
          style={{
            height: 100,
            marginBottom: 24,
          }}
        />
      </Form.Item>
    </Card>
  );
};
