import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Row, Card, Modal, Col } from 'antd';
import '../App.css';
import { postLoginAuth } from '../store/authSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import { CustomButton } from '../components/CustomButton/CustomButton';
import { useSelector } from 'react-redux';

const Login = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [contentModal, setContentModal] = useState();
  const successLogin = useSelector((state) => state.auth.isSuccess);
  const isLoading = useSelector((state) => state.auth.loading);

  const onFinish = (values) => {
    if (
      (values.username === undefined || values.username === '') &&
      (values.password !== undefined || values.password !== '')
    ) {
      setOpenModal(true);
      setContentModal('Please enter username!');
      return;
    }
    if (
      (values.username !== undefined || values.username !== '') &&
      (values.password === undefined || values.password === '')
    ) {
      setOpenModal(true);
      setContentModal('Please enter password!');
      return;
    }
    if (
      (values.username === undefined || values.username === '') &&
      (values.password === undefined || values.password === '')
    ) {
      setOpenModal(true);
      setContentModal('Please enter username and password!');
      return;
    }

    dispatch(
      postLoginAuth({
        username: values.username,
        password: values.password,
      }),
    );

    setTimeout(() => {
      if (successLogin === undefined || successLogin === false) {
        setOpenModal(true);
        setContentModal('Username or password error!');
        return;
      }
    }, 800);
  };

  return (
    <>
      <div
        className="site-card-border-less-wrapper"
        style={{
          backgroundImage: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
        }}
      >
        <Row
          justify="center"
          align="middle"
          style={{
            height: '100vh',
            backgroundSize: 'contain',
          }}
        >
          <Card
            bordered={false}
            style={{
              width: 500,
            }}
          >
            <div
              style={{
                margin: '24px',
              }}
            >
              <h1>Login</h1>
              <p
                style={{
                  marginBottom: '14px',
                }}
              >
                Sign in to your account
              </p>
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
              >
                <Form.Item name="username" style={{ marginBottom: '10px' }}>
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Username"
                  />
                </Form.Item>
                <Form.Item name="password">
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Password"
                  />
                </Form.Item>

                <Form.Item style={{ marginTop: '10px' }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    size="large"
                    loading={isLoading}
                  >
                    Log in
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Card>
        </Row>
      </div>
      <Modal open={openModal} closable={false} footer={null}>
        <Row style={{ textAlign: 'center', margin: '20px' }}>
          <Col span={24}>
            <CloseCircleOutlined
              style={{ fontSize: '100px', color: '#f27474' }}
            />
            <div style={{ fontSize: '36px', marginTop: '20px' }}>
              Login failed
            </div>
            <div style={{ fontSize: '24px' }}>{contentModal}</div>
            <CustomButton
              agree
              onClick={() => setOpenModal(false)}
              content={'OK'}
            />
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default Login;
