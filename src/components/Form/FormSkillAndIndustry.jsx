import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Form, Row, Col } from 'antd';

import { fetchSoftSkills } from '../../store/softSkillsSlice';
import { fetchJobFunctionsSkills } from '../../store/jobFunctionsSkillsSlice';
import {
  fetchIndustries,
  fetchSectors,
  fetchCategories,
} from '../../store/categoriesSlice';
import { fetchLanguages } from '../../store/languagesSlice';

import { putBusinessLineCandidateSlice } from '../../store/businessLineSlice';
import { putNewDetailCandidate } from '../../store/candidatesSlice';

import { FormIemSelectGroup } from '../FormItem/FormIemSelectGroup';
import { FormItemBusinessLine } from '../FormItem/FormItemBusinessLine';
import { FormItemSelectLanguages } from '../FormItem/FormItemSelectLanguages';
import { FormItemSelectMultiple } from '../FormItem/FormItemSelectMultiple';

const FormSkillAndIndustry = ({ detailCandidate }) => {
  const [form] = Form.useForm();
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
          <FormIemSelectGroup
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
            actionDispatch={putBusinessLineCandidateSlice}
          />
        </Col>
      </Row>
    </Form>
  );
};
export default FormSkillAndIndustry;
