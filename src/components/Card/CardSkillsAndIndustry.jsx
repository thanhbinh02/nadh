import { Form, Row, Col, Card } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  fetchSoftSkills,
  putSoftSkillsCandidate,
} from '../../store/softSkillsSlice';
import { FormItemSelectMultiple } from '../FormItem/FormItemSelectMultiple';

export const CardSkillsAndIndustry = ({ idCandidate, dataDefault }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const softSkills = useSelector((state) => state.softSkills.data);

  useEffect(() => {
    dispatch(fetchSoftSkills());
  }, []);

  return (
    <Card
      style={{
        width: '100%',
      }}
      title="Skills And Industry"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row gutter={(16, 16)} style={{ marginBottom: '24px' }}>
          <Col span={12}>
            <FormItemSelectMultiple
              name="soft_skills"
              label="Soft skills"
              placeholder="Select your soft kills"
              options={softSkills}
              actionDispatch={putSoftSkillsCandidate}
              id={idCandidate}
              dataDefault={dataDefault}
            />
          </Col>
        </Row>
      </Form>
    </Card>
  );
};
