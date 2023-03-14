import { PlusOutlined } from '@ant-design/icons';
import { Button, Select, Modal, Row, Col, Form, Space } from 'antd';
import { useState } from 'react';
import { fetchNationality } from '../../store/nationalitySlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CustomButton } from '../CustomButton/CustomButton';
import { InfoCircleOutlined } from '@ant-design/icons';
import { postNationality } from '../../store/nationalitySlice';
import { getNationalityTest } from '../../apis/filterApi';
import { useQuery } from 'react-query';

const { Option } = Select;

export const SelectMultipleAdd = ({
  form, //
  getData, //
  name, //
  label, //
  placeholder,
  dataDefault,
  id,
  actionDispatch, //
}) => {
  const dispatch = useDispatch();

  const [showAddItem, setShowAddItem] = useState(false);
  const [open, setOpen] = useState(false);
  const [contentModal, setContentModal] = useState();

  const [fetchData, setFetchData] = useState(true);
  const [test, setTest] = useState(dataDefault);

  const { data: options } = useQuery([name, fetchData], getData);

  useEffect(() => {
    let defaultValue;
    if (id) {
      defaultValue = dataDefault.map((item) => item.key);
    }
    form.setFieldValue(name, defaultValue);
  }, []);

  useEffect(() => {
    form.setFieldValue(name, test);
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
    const hasLabe = options.data.some((item) => item.label === contentModal);
    if (!hasLabe) {
      setTest((prevValues) => [...prevValues, contentModal]);
      form.setFieldValue(name, test);
    }

    setFetchData(!fetchData);
  };

  const handleFocus = () => {
    setFetchData(!fetchData);
  };

  const handleBlur = () => {
    setFetchData(!fetchData);
  };

  const handleChange = (value) => {
    const selectedLabels = [];
    options.data.forEach((option) => {
      if (value.includes(option.key)) {
        selectedLabels.push(option.label);
      }
    });
    const result = [];

    for (let i = 0; i < value.length; i++) {
      result.push({
        key: value[i],
        label: selectedLabels[i],
      });
    }

    if (!id) {
      // dispatch(actionDispatch({ value: result, label: name }));
    } else {
      const newData = {
        id: id,
        params: {
          [`${name}`]: result,
        },
      };

      // dispatch(actionDispatch(newData));
    }
  };

  return (
    <>
      <Form.Item name={name} label={label}>
        <Select
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onSearch={handleSearch}
          placeholder={placeholder}
          showSearch
          style={{
            width: 300,
          }}
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
            {options?.data?.map((option) => {
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
              {`Do you want to create ${contentModal} as new ${name}?`}
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
