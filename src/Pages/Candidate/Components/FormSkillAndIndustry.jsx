import { Select, Form, Row, Col, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchSoftSkills } from '../../../store/softSkillsSlice';
import { fetchJobFunctionsSkills } from '../../../store/jobFunctionsSkillsSlice';
import FormSelectGroup from '../../../components/Form/FormSelectGroup';
import { fetchLanguages } from '../../../store/languagesSlice';
import { FormItemSelectMultiple } from './FormItemSelectMultiple';
import { putNewDetailCandidate } from '../../../store/candidatesSlice';
import { FormItemSelectLanguages } from './FormItemSelectLanguages';

import FormItemBusinessLine from './FormItemBusinessLine';
import { fetchIndustries } from '../../../store/categoriesSlice';
import { fetchSectors } from '../../../store/categoriesSlice';
import { fetchCategories } from '../../../store/categoriesSlice';
import { putBusinessLineSlice } from '../../../store/businessLineSlice';

const FormSkillAndIndustry = ({ detailCandidate }) => {
  const [test, setTest] = useState([]);
  const [form] = Form.useForm();
  const { Option } = Select;
  const dispatch = useDispatch();
  const jobFunctionsSkills = useSelector(
    (state) => state.jobFunctionsSkills.data,
  );
  const languages = useSelector((state) => state.languages.languages);

  const softSkills = useSelector((state) => state.softSkills.data);
  const idCandidate = detailCandidate?.id;
  const softSkillsCandidate = detailCandidate?.soft_skills;
  const languagesCandidate = detailCandidate?.languages;
  const businessLine = detailCandidate?.business_line;

  const industries = useSelector((state) => state.categories.industries);
  const sectors = useSelector((state) => state.categories.sectors);
  const categories = useSelector((state) => state.categories.categories);

  useEffect(() => {
    dispatch(fetchSoftSkills());
    dispatch(fetchJobFunctionsSkills());
    dispatch(fetchLanguages());
    dispatch(fetchIndustries({ type: 1 }));
  }, []);

  return (
    <Form form={form} layout="vertical" autoComplete="off">
      <Row gutter={(16, 16)} style={{ marginBottom: '24px' }}>
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

      <Row gutter={(12, 12)} style={{ marginBottom: '24px' }}>
        <Col span={12}>
          <FormItemSelectLanguages
            name="languages"
            label="Languages"
            placeholder="Select your languages"
            options={languages}
            actionDispatch={putNewDetailCandidate}
            id={idCandidate}
            detailCandidate={detailCandidate}
            dataDefault={languagesCandidate}
            form={form}
          />
        </Col>
      </Row>
      <Row gutter={(12, 12)} style={{ marginBottom: '24px' }}>
        <Col span={24}>
          <FormItemBusinessLine
            data={industries}
            optionTwo={sectors}
            optionThree={categories}
            typeTwo={2}
            fetchDataItemTwo={fetchSectors}
            fetchDataItemThree={fetchCategories}
            typeThree={3}
            businessLine={businessLine}
            form={form}
            id={idCandidate}
            actionDispatch={putBusinessLineSlice}
          />
        </Col>
      </Row>
    </Form>
  );
};
export default FormSkillAndIndustry;
