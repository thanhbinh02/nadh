import {
  Select,
  Form,
  Input,
  Row,
  Col,
  Radio,
  InputNumber,
  Button,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchSoftSkills } from '../../../store/softSkillsSlice';
import { FormSelectItem } from '../../../components/Form/FormSelectItem';
import { fetchJobFunctionsSkills } from '../../../store/jobFunctionsSkillsSlice';
import FormSelectGroup from '../../../components/Form/FormSelectGroup';
import { fetchLanguages } from '../../../store/languagesSlice';

const FormSkillAndIndustry = () => {
  const [form] = Form.useForm();
  const { Option } = Select;
  const dispatch = useDispatch();

  const softSkills = useSelector((state) => state.softSkills.data);
  const jobFunctionsSkills = useSelector(
    (state) => state.jobFunctionsSkills.data,
  );
  const languages = useSelector((state) => state.languages.languages);

  useEffect(() => {
    dispatch(fetchSoftSkills());
    dispatch(fetchJobFunctionsSkills());
    dispatch(fetchLanguages());
  }, []);

  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Row gutter={(12, 12)}>
        <Col span={12}>
          <FormSelectItem
            name="relocating_willingness"
            label="Soft skills"
            placeholder="Select your soft kills"
            options={softSkills}
            mode="multiple"
          />
        </Col>
        <Col span={12}>
          <FormSelectGroup
            data={jobFunctionsSkills}
            label="Job functions skills"
            name="skills"
            placeholder="Select your job functions skills"
          />
        </Col>
      </Row>

      <Row gutter={(12, 12)}>
        <Col span={12}>
          <FormSelectItem
            name="languages"
            label="Languages"
            placeholder="Select or add your languages"
            options={languages}
          />
        </Col>
      </Row>
      <Row gutter={(12, 12)}>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
};
export default FormSkillAndIndustry;
