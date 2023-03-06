import { Select, Form, Row, Col, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchSoftSkills } from '../../../store/softSkillsSlice';
import { FormSelectItem } from '../../../components/Form/FormSelectItem';
import { fetchJobFunctionsSkills } from '../../../store/jobFunctionsSkillsSlice';
import FormSelectGroup from '../../../components/Form/FormSelectGroup';
import { fetchLanguages } from '../../../store/languagesSlice';
import { FormItemSelectMultiple } from './FormItemSelectMultiple';
import { putNewDetailCandidate } from '../../../store/candidatesSlice';
import { FormItemSelectLanguages } from './FormItemSelectLanguages';

const FormSkillAndIndustry = () => {
  const [test, setTest] = useState([]);
  const [form] = Form.useForm();
  const { Option } = Select;
  const dispatch = useDispatch();
  const jobFunctionsSkills = useSelector(
    (state) => state.jobFunctionsSkills.data,
  );
  const languages = useSelector((state) => state.languages.languages);

  const softSkills = useSelector((state) => state.softSkills.data);
  const detailCandidate = JSON.parse(localStorage.getItem('candidateDetail'));
  const idCandidate = detailCandidate?.id;
  const softSkillsCandidate = detailCandidate?.soft_skills;
  const languagesCandidate = detailCandidate?.languages;

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
          <FormItemSelectMultiple
            name="soft_skills"
            label="Soft skills"
            placeholder="Select your soft kills"
            options={softSkills}
            actionDispatch={putNewDetailCandidate}
            id={idCandidate}
            detailCandidate={detailCandidate}
            nameLocal="candidateDetail"
            dataDefault={softSkillsCandidate}
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
          <FormItemSelectLanguages
            name="languages"
            label="Languages"
            placeholder="Select or add your languages"
            options={languages}
            actionDispatch={putNewDetailCandidate}
            id={idCandidate}
            detailCandidate={detailCandidate}
            nameLocal="candidateDetail"
            dataDefault={languagesCandidate}
            form={form}
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
