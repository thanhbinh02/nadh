import { Steps, Row, Card, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import FormPersonalInformation from './Components/FormPersonalInformation';

const CandidateAdd = () => {
  const [currentStep, setCurrentStep] = useState(0);

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
        <Card style={{ width: '100%' }}>
          <FormPersonalInformation />
        </Card>
      </Row>
    </div>
  );
};
export default CandidateAdd;
