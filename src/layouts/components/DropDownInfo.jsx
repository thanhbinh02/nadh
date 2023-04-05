import { Row, Col, Dropdown, Button, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { HiUserCircle } from 'react-icons/hi';
import { logoutAuth } from '../../store/authSlice';
import { CustomButton } from '../../components/CustomButton/CustomButton';

export const DropDownInfo = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);

  const auth = JSON.parse(window.localStorage.getItem('user_sent'));

  const handleLogout = () => {
    window.localStorage.removeItem('filterCDD');
    dispatch(logoutAuth());
  };

  const items = [
    {
      label: (
        <div aria-hidden="true">
          <UserOutlined />
          <span style={{ marginLeft: '10px' }}>User Information</span>
        </div>
      ),
      key: 1,
    },
    {
      label: (
        <div
          aria-hidden="true"
          role="presentation"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          <LogoutOutlined />
          <span style={{ marginLeft: '10px' }}> Log Out</span>
        </div>
      ),
      key: 2,
    },
  ];

  return (
    <>
      <Dropdown
        menu={{
          items,
        }}
        trigger={['click']}
      >
        <Button
          type="text"
          style={{
            height: '100%',
            padding: 0,
          }}
        >
          <Row gutter={8}>
            <Col>
              <p
                style={{
                  color: 'white',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                }}
              >
                {auth?.full_name}
              </p>
              <p
                style={{
                  color: 'white',
                }}
              >
                {auth.user_name} - manager
              </p>
            </Col>
            <Col style={{ display: 'flex', alignItems: 'center' }}>
              <HiUserCircle
                style={{
                  fontSize: '40px',
                  color: '#ccc',
                }}
              />
            </Col>
          </Row>
        </Button>
      </Dropdown>
      <Modal open={openModal} closable={false} footer={null} centered>
        <Row style={{ textAlign: 'center', margin: '20px' }}>
          <Col span={24}>
            <div
              style={{ fontSize: '30px', fontWeight: '700', color: '#595959' }}
            >
              Confirm to logout
            </div>
            <CustomButton agree onClick={handleLogout} content={'Yes'} />
            <CustomButton
              reject
              onClick={() => setOpenModal(false)}
              content={'No'}
            />
          </Col>
        </Row>
      </Modal>
    </>
  );
};
