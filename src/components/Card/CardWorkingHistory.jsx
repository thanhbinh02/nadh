import { Card, Row, Col, Button, Form } from 'antd';
import { TableWorkingHistory } from '../Table/TableWorkingHistory';

export const CardWorkingHistory = ({ setCurrentStep }) => {
  const handleNextStep = () => {
    setCurrentStep(4);
    window.localStorage.setItem('currentStep', 4);
  };

  const handlePreviousStep = () => {
    setCurrentStep(2);
    window.localStorage.setItem('currentStep', 2);
  };

  return (
    <Card
      title="WORKING HISTORY"
      bordered={false}
      style={{
        width: '100%',
      }}
    >
      <TableWorkingHistory />
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
// ACADEMIC
