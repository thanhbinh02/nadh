import { Modal, Row } from 'antd';
import { useState } from 'react';
import { CustomButton } from '../CustomButton/CustomButton';

export const ModalAddEducation = ({ open }) => {
  const [modal2Open, setModal2Open] = useState(open);

  return (
    <Modal centered open={modal2Open} closable={false} footer={null}>
      <Row style={{ textAlign: 'center', margin: '20px' }}>Thanh Binh</Row>
      <CustomButton login onClick={() => setModal2Open(false)} />
    </Modal>
  );
};
