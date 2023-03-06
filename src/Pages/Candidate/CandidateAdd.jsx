import { Steps, Row, Card, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import FormPersonalInformation from './Components/FormPersonalInformation';
import FormSkillAndIndustry from './Components/FormSkillAndIndustry';
import { CardEducationAndCertificate } from '../../components/Card/CardEducationAndCertificate';
import { useEffect } from 'react';

const stepLocal = window.localStorage.getItem('currentStep');

const CandidateAdd = () => {
  const [currentStep, setCurrentStep] = useState(stepLocal || 0);

  useEffect(() => {}, [currentStep]);

  return (
    <div style={{ margin: '20px 30px' }}>
      <Row>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to="/candidates">Candidates List</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span>Create Candidate</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <div style={{ fontSize: '20px', fontWeight: '600', margin: '10px 0' }}>
        Create Candidate
      </div>
      <Row>
        <Steps
          current={currentStep}
          items={[
            {
              title: 'Personal Information',
            },
            {
              title: 'Skills and Industry',
            },
            {
              title: 'Education and Certificate',
            },
            {
              title: 'Working History',
            },
            {
              title: 'Remunertion and Rewards',
            },
            {
              title: 'Finish',
            },
          ]}
        />
      </Row>
      <Row style={{ width: '100%' }}>
        {currentStep === 0 && (
          <Card style={{ width: '100%' }}>
            <FormPersonalInformation />
          </Card>
        )}
        {Number(currentStep) === 1 && (
          <Card style={{ width: '100%' }}>
            <FormSkillAndIndustry setCurrentStep={setCurrentStep} />
          </Card>
        )}
        {Number(currentStep) === 2 && <CardEducationAndCertificate />}
      </Row>
    </div>
  );
};
export default CandidateAdd;
