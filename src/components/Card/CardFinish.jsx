import { Card, Row, Col, Button, Result } from 'antd';

export const CardFinish = ({ setCurrentStep }) => {
  const handlePreviousStep = () => {
    setCurrentStep(4);
    window.localStorage.setItem('currentStep', 4);
  };

  const candidateId = JSON.parse(
    localStorage.getItem('candidateDetail'),
  ).candidate_id;

  const fullName = JSON.parse(
    localStorage.getItem('candidateDetail'),
  ).full_name;

  return (
    <Card
      title="FINISH"
      bordered={false}
      style={{
        width: '100%',
      }}
    >
      <Result
        status="success"
        title="Successfully"
        subTitle={`Candidate Number: ${candidateId} ${fullName}`}
        extra={[
          <Button type="primary" key="console">
            View Detail
          </Button>,
          <Button key="buy">Create New</Button>,
        ]}
      />
      <Row gutter={(12, 12)}>
        <Col span={24} style={{ textAlign: 'right', marginTop: '10px' }}>
          <Button style={{ marginRight: '10px' }} onClick={handlePreviousStep}>
            Previous
          </Button>
        </Col>
      </Row>
    </Card>
  );
};
