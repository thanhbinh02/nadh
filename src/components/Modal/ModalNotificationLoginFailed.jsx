import { Button, Modal, Row, Col } from 'antd';
import { useState } from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import { CustomButton } from '../CustomButton/CustomButton';

const ModalNotificationLoginFailed = ({
  notification,
  openModalNotificationLoginFailed,
}) => {
  const [modal2Open, setModal2Open] = useState(false);
  if (openModalNotificationLoginFailed) {
    setModal2Open = true;
  }
  return (
    <>
      <Button type="primary" onClick={() => setModal2Open(true)}>
        Vertically centered modal dialog
      </Button>
      <Modal centered open={modal2Open} closable={false} footer={null}>
        <Row style={{ textAlign: 'center', margin: '20px' }}>
          <Col span={24}>
            <CloseCircleOutlined
              style={{ fontSize: '100px', color: '#f27474' }}
            />
            <h2 style={{ fontSize: '36px', marginTop: '20px' }}>
              Login failed
            </h2>
            <p> {notification}</p>

            <CustomButton login onClick={() => setModal2Open(false)} />
          </Col>
        </Row>
      </Modal>
    </>
  );
};
export default ModalNotificationLoginFailed;
