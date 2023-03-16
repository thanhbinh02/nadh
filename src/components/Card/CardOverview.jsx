import { Card, Input, Form } from 'antd';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
const { TextArea } = Input;

export const CardOverview = ({
  defaultValue,
  putCandidateType,
  form,
  setOpen,
  setCancel,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    form.setFieldValue('overview_text_new', defaultValue);
  }, []);

  const onChange = (e) => {
    setCancel(false);
    if (setOpen) {
      setOpen(true);
    }
    dispatch(
      putCandidateType({ value: e.target.value, label: 'overview_text_new' }),
    );
  };

  return (
    <Card
      title="Overview"
      style={{
        width: '100%',
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
