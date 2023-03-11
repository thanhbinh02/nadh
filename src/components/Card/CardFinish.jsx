import { Card, Row, Col, Button, Result } from 'antd';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { removeUserNewCandidate } from '../../store/createCandidateSlice';

export const CardFinish = ({ setCurrentStep }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.createCandidate.user);

  const handleViewDetail = () => {
    window.localStorage.removeItem('candidateDetail');
    window.localStorage.removeItem('currentStep');
    navigate(`/candidate-detail/${user.candidate_id}`);
    dispatch(removeUserNewCandidate());
  };

  const handleCreateNew = () => {
    window.localStorage.removeItem('candidateDetail');
    window.localStorage.removeItem('currentStep');
    dispatch(removeUserNewCandidate());
    navigate('/candidate-add');
    setCurrentStep(0);
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
        title="Create successfully"
        extra={[
          <Button type="primary" key="console" onClick={handleViewDetail}>
            View Detail
          </Button>,
          <Button key="buy" onClick={handleCreateNew}>
            Create New
          </Button>,
        ]}
      />
    </Card>
  );
};
