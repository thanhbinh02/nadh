import { Card, Row, Col, Button, Form } from 'antd';

export const CardRemunerationAndRewards = ({ setCurrentStep }) => {
  const handleNextStep = () => {
    setCurrentStep(5);
    window.localStorage.setItem('currentStep', 5);
  };

  const handlePreviousStep = () => {
    setCurrentStep(3);
    window.localStorage.setItem('currentStep', 3);
  };

  return (
    <Card
      title="REMUNERATION AND REWARDS"
      bordered={false}
      style={{
        width: '100%',
      }}
    >
      <div>REMUNERATION AND REWARDS</div>
      <Row gutter={(12, 12)}>
        <Col span={24} style={{ textAlign: 'right', marginTop: '10px' }}>
          <Button style={{ marginRight: '10px' }} onClick={handlePreviousStep}>
            Previous
          </Button>
          <Button type="primary" onClick={handleNextStep}>
            Next
          </Button>
        </Col>
      </Row>
    </Card>
  );
};
