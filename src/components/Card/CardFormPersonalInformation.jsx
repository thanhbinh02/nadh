import { Row, Col, Button, Modal, Card } from 'antd';
import { useState } from 'react';
import FormPersonalInformation from '../../Pages/Candidate/Components/FormPersonalInformation';
import { CustomButton } from '../CustomButton/CustomButton';
import { postNewCandidate } from '../../store/createCandidateSlice';
import { useDispatch } from 'react-redux';

export const CardFormPersonalInformation = ({ setCurrentStep }) => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(true);
  };

  const handleAgree = (createCandidate) => {
    dispatch(postNewCandidate(createCandidate));
  };

  return (
    <Card
      style={{
        width: '100%',
      }}
    >
      <FormPersonalInformation
        setCurrentStep={setCurrentStep}
        handleOpenModal={handleOpenModal}
        handleAgree={handleAgree}
        handleCloseModal={handleCloseModal}
      />
      <Modal centered open={openModal} closable={false} footer={null}>
        <Row style={{ textAlign: 'center', margin: '20px' }}>
          <Col span={24}>
            <div
              style={{ fontSize: '30px', fontWeight: '700', color: '#595959' }}
            >
              Are you sure you want to create new candidate?
            </div>
          </Col>
          <Col span={24}>
            <CustomButton agree content="Yes" onClick={() => handleAgree()} />

            <CustomButton
              reject
              onClick={() => setOpenModal(false)}
              content="No"
            />
          </Col>
        </Row>
      </Modal>
    </Card>
  );
};
