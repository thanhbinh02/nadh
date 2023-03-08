import { Steps, Row, Card, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import FormPersonalInformation from './Components/FormPersonalInformation';
import FormSkillAndIndustry from './Components/FormSkillAndIndustry';
import { CardEducationAndCertificate } from '../../components/Card/CardEducationAndCertificate';
import { useEffect } from 'react';
import { CardWorkingHistory } from '../../components/Card/CardWorkingHistory';
import { CardRemunerationAndRewards } from '../../components/Card/CardRemunerationAndRewards';
import { CardFinish } from '../../components/Card/CardFinish';
import { CardFormPersonalInformation } from '../../components/Card/CardFormPersonalInformation';

const CandidateAdd = () => {
  const stepLocal = window.localStorage.getItem('currentStep');
  if (stepLocal === null) {
    window.localStorage.setItem('currentStep', 0);
  }
  const [currentStep, setCurrentStep] = useState(stepLocal || 0);

  useEffect(() => {}, [stepLocal]);

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
        {Number(currentStep) === 0 && (
          <Card style={{ width: '100%' }}>
            <FormPersonalInformation setCurrentStep={setCurrentStep} />
          </Card>
        )}
        {Number(currentStep) === 1 && (
          <Card style={{ width: '100%' }}>
            <FormSkillAndIndustry setCurrentStep={setCurrentStep} />
          </Card>
        )}
        {Number(currentStep) === 2 && (
          <CardEducationAndCertificate setCurrentStep={setCurrentStep} />
        )}
        {Number(currentStep) === 3 && (
          <CardWorkingHistory setCurrentStep={setCurrentStep} />
        )}
        {Number(currentStep) === 4 && (
          <CardRemunerationAndRewards setCurrentStep={setCurrentStep} />
        )}
        {Number(currentStep) === 5 && (
          <CardFinish setCurrentStep={setCurrentStep} />
        )}
      </Row>
    </div>
  );
};
export default CandidateAdd;
