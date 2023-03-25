import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Card, Button, Result } from 'antd';
import { removeUserNewCandidate } from '../../store/createCandidateSlice';

export const CardFinish = ({ setCurrentStep, viewDetail, createNew }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleViewDetail = () => {
    navigate(viewDetail);
    dispatch(removeUserNewCandidate());
  };

  const handleCreateNew = () => {
    dispatch(removeUserNewCandidate());
    navigate(createNew);
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
