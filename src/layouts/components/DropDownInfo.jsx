import React from 'react';
import { Row, Col, Dropdown, Button, Modal } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { HiUserCircle } from 'react-icons/hi';
import { logoutAuth } from '../../store/authSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { CustomButton } from '../../components/CustomButton/CustomButton';

export const DropDownInfo = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);

  const auth = JSON.parse(window.localStorage.getItem('user_sent'));

  const handleLogout = () => {
    window.localStorage.removeItem('candidateDetail');
    window.localStorage.removeItem('currentStep');
    dispatch(logoutAuth());
  };

  const items = [
    {
      label: 'User Information',
      key: 1,
      icon: <UserOutlined />,
    },
    {
      label: (
        <span
          aria-hidden="true"
          role="presentation"
          onClick={() => {
            setOpenModal(true);
          }}
        >
          Log Out
        </span>
      ),
      key: 2,
      icon: <LogoutOutlined />,
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
      <Modal centered open={openModal} closable={false} footer={null}>
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

// const array = [
//   {
//     full_name: '33',
//   },
//   {
//     priority_status: '44',
//   },
//   {
//     location: {
//       countryCity: {
//         city: 'An Giang',
//         country: 'Viet Nam',
//       },
//     },
//   },
// ];

const array = [
  {
    priority_status: '44',
  },
  {
    location: {
      countryCity: {
        city: 'An Giang',
        country: 'Viet Nam',
      },
    },
  },
];
