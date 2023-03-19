import React, { useEffect } from 'react';
import { Form, Select, Space, Button, Modal, Row, Col } from 'antd';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { useQuery } from 'react-query';
import { CustomButton } from '../CustomButton/CustomButton';

import { InfoCircleOutlined } from '@ant-design/icons';
const { Option } = Select;

export const FormItemSelectOneAdd = ({
  name,
  label,
  placeholder,
  addItem,
  postData,
  form,
  putData,
  getData,
}) => {
  const dispatch = useDispatch();
  const [showAddItem, setShowAddItem] = useState(false);
  const [open, setOpen] = useState(false);
  const [contentModal, setContentModal] = useState();

  const { data } = useQuery([name, contentModal], () => getData(contentModal));

  useEffect(() => {}, [open]);

  const handleOpenModalAdd = () => {
    dispatch(postData(contentModal));
    form.setFieldValue(name, contentModal);
    setOpen(!open);
    setContentModal();
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
          {data?.data.map((option) => {
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
    </>
  );
};
