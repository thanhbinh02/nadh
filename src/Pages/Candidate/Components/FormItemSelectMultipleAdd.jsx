import React from 'react';
import { Form, Select, Space, Button, Modal, Row, Col } from 'antd';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { InfoCircleOutlined } from '@ant-design/icons';
import { CustomButton } from '../../../components/CustomButton/CustomButton';

const { Option } = Select;
export const FormItemSelectMultipleAdd = ({
  name,
  label,
  placeholder,
  addItem,
  postData,
  form,
  options,
  putData,
}) => {
  const dispatch = useDispatch();
  const [showAddItem, setShowAddItem] = useState(false);
  const [open, setOpen] = useState(false);
  const [contentModal, setContentModal] = useState();

  const handleAgree = () => {
    dispatch(postData(contentModal));
    form.setFieldValue(name, contentModal);
    setOpen(false);
  };

  const handleOpenModalAdd = () => {
    if (setOpen) {
      setOpen(true);
    }
  };

  const handleChange = (value, option) => {
    form.setFieldValue(name, value);
    setContentModal(undefined);
    if (value) {
      dispatch(
        putData({
          key: option.key,
          label: option.label,
        }),
      );
    }
  };

  const handleSearch = (value) => {
    if (value !== '' && value !== undefined) {
      setShowAddItem(true);
      setContentModal(value);
    } else {
      setShowAddItem(false);
    }
  };

  return (
    <>
      <Form.Item name={name} label={label}>
        <Select
          showSearch
          allowClear
          style={{ width: '100%', borderRadius: '0px' }}
          optionFilterProp="children"
          onChange={handleChange}
          placeholder={placeholder}
          onSearch={handleSearch}
          dropdownRender={(menu) => {
            return (
              <>
                {menu}
                <>
                  {addItem && (
                    <>
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
                  )}
                </>
              </>
            );
          }}
        >
          {options.map((option) => {
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
              {`Do you want to create  ${contentModal} as new ${name}?`}
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
    </>
  );
};
