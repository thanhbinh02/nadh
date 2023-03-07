import { Card, Row, Col, Button, Result } from 'antd';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const CardFinish = ({ setCurrentStep }) => {
  const navigate = useNavigate();

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

  const handleViewDetail = () => {
    window.localStorage.removeItem('candidateDetail');
    window.localStorage.removeItem('currentStep');
    navigate(`/candidate-detail/${candidateId}`);
  };

  const handleCreateNew = () => {
    window.localStorage.removeItem('candidateDetail');
    window.localStorage.removeItem('currentStep');
    navigate(`/candidate-add`);
  };

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
          <Button type="primary" key="console" onClick={handleViewDetail}>
            View Detail
          </Button>,
          <Button key="buy" onClick={handleCreateNew}>
            Create New
          </Button>,
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
