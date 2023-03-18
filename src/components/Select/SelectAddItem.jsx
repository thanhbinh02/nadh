import { PlusOutlined } from '@ant-design/icons';
import { Button, Select, Modal, Row, Col, Form, Space } from 'antd';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { CustomButton } from '../CustomButton/CustomButton';
import { InfoCircleOutlined } from '@ant-design/icons';
import { postNationality } from '../../store/nationalitySlice';
import { getNationalityTest } from '../../apis/filterApi';
import { useQuery } from 'react-query';

const { Option } = Select;

export const SelectAddItem = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [showAddItem, setShowAddItem] = useState(false);
  const [open, setOpen] = useState(false);
  const [contentModal, setContentModal] = useState();

  const [fetchData, setFetchData] = useState(true);
  const [test, setTest] = useState(JSON.parse(localStorage.getItem('test')));

  const { data: dataGet } = useQuery(['get', fetchData], getNationalityTest);

  useEffect(() => {
    form.setFieldValue('test', test);
  }, []);

  useEffect(() => {
    form.setFieldValue('test', test);
  }, [fetchData]);

  const handleSearch = (value) => {
    if (value !== '' && value !== undefined) {
      setShowAddItem(true);
      setContentModal(value);
    } else {
      handleBlur();
      setShowAddItem(false);
    }
  };

  const handleOpenModalAdd = () => {
    if (setOpen) {
      setOpen(true);
    }
  };

  const handleAgree = () => {
    dispatch(postNationality(contentModal));
    setOpen(false);
    const hasLabe = dataGet.data.some((item) => item.label === contentModal);
    if (!hasLabe) {
      setTest((prevValues) => [...prevValues, contentModal]);
      form.setFieldValue('test', test);
    }

    setFetchData(!fetchData);
  };

  const handleFocus = () => {
    setFetchData(!fetchData);
  };

  const handleBlur = () => {
    setFetchData(!fetchData);
  };

  return (
    <>
      <Form form={form}>
        <Form.Item name="test">
          <Select
            onBlur={handleBlur}
            onFocus={handleFocus}
            onSearch={handleSearch}
            showSearch
            style={{
              width: 300,
            }}
            placeholder="custom dropdown render"
            mode="multiple"
            dropdownRender={(menu) => {
              return (
                <>
                  {menu}
                  {showAddItem && (
                    <Space>
                      <Button
                        type="text"
                        icon={<PlusOutlined />}
                        style={{ width: '100%', alignItems: 'flex-start' }}
                        onMouseDown={handleOpenModalAdd}
                      >
                        Add item
                      </Button>
                    </Space>
                  )}
                </>
              );
            }}
          >
            <>
              {dataGet?.data?.map((option) => {
                return (
                  <Option
                    key={option.key}
                    value={option.label}
                    label={option.label}
                  >
                    {option.label}
                  </Option>
                );
              })}
            </>
          </Select>
        </Form.Item>
        <Modal centered open={open} closable={false} footer={null}>
          <Row style={{ textAlign: 'center', margin: '20px' }}>
            <Col span={24}>
              <InfoCircleOutlined
                style={{ fontSize: '80px', color: '#facea8' }}
              />
            </Col>
            <Col span={24}>
              <h2
                style={{
                  fontSize: '28px',
                  marginTop: '20px',
                }}
              >
                {`Do you want to create ${contentModal} as new nationality?`}
              </h2>
            </Col>
            <Col span={24}>
              <CustomButton agree content={'Yes'} onClick={handleAgree} />
              <CustomButton
                reject
                onClick={() => setOpen(false)}
                content={'No'}
              />
            </Col>
          </Row>
        </Modal>
      </Form>
    </>
  );
};
