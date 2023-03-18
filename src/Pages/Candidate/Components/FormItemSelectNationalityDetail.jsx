import React from 'react';
import { Form, Select, Space, Button, Modal, Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { InfoCircleOutlined } from '@ant-design/icons';
import { CustomButton } from '../../../components/CustomButton/CustomButton';
import { useQuery } from 'react-query';

const { Option } = Select;
export const FormItemSelectNationalityDetail = ({
  name,
  label,
  actionDispatch,
  placeholder,
  defaultValue,
  addItem,
  postData,
  form,
  check,
  getData,
  keyNewItem,
  setCancel,
}) => {
  // const keyNewItem = useSelector((state) => state.nationality.keyNationality);
  const dispatch = useDispatch();
  const [showAddItem, setShowAddItem] = useState(false);
  const [fetchData, setFetchData] = useState(true);
  const [open, setOpen] = useState(false);
  const [test, setTest] = useState(defaultValue?.map((item) => item.label));
  const [testResult, setTestResult] = useState([]);
  const [checkPost, setCheckPost] = useState(true);
  const [checkFocus, setCheckFocus] = useState(false);
  const [newValue, setNewValue] = useState(defaultValue);

  const [contentModal, setContentModal] = useState();
  const [removeItem, setRemoveItem] = useState(true);
  const [clearItem, setClearItem] = useState(false);

  const { data: dataGet } = useQuery([name, contentModal], () =>
    getData(contentModal),
  );

  useEffect(() => {
    setNewValue(defaultValue);
    form.setFieldValue(name, test);
  }, []);

  useEffect(() => {}, [checkPost]);

  useEffect(() => {
    if (!clearItem) {
      if (!defaultValue) {
        setClearItem(false);
      }
    }
  }, [fetchData]);

  const handleAgree = () => {
    dispatch(postData(contentModal));
    setCheckPost(!checkPost);
    setOpen(false);
    setCheckFocus(true);
    setFetchData(!fetchData);
    if (contentModal !== undefined) {
      let currentValue = form.getFieldValue(name);
      currentValue.push(contentModal);
      form.setFieldValue(name, currentValue);
      let dataPut = [...newValue, { key: keyNewItem, label: contentModal }];
      dispatch(actionDispatch({ value: dataPut, label: name }));
      setNewValue(dataPut);
      setContentModal(undefined);
    }
  };

  const handleOpenModalAdd = () => {
    setOpen(true);
  };

  const handleChange = (value) => {
    if (setCancel) {
      setCancel(false);
    }

    if (removeItem) {
      const label = newValue?.map((item) => item.label);
      const valueAdd = value.filter((item) => !label.includes(item));
      const result = dataGet?.data
        .filter((item) => valueAdd.includes(item.label))
        .map(({ label, key }) => ({ label, key }));
      setNewValue(newValue.concat(result));
    } else {
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

  const handleBlur = () => {
    setFetchData(!fetchData);

    if (clearItem) {
      setClearItem([]);
      dispatch(actionDispatch({ value: [], label: name }));
    } else {
      dispatch(actionDispatch({ value: newValue, label: name }));
    }
  };

  const handleClear = () => {
    if (setCancel) {
      setCancel(false);
    }

    setTestResult([]);
    setNewValue([]);
    setClearItem(true);
    setRemoveItem(true);
  };

  const handleRemoveItem = (value) => {
    if (setCancel) {
      setCancel(false);
    }

    setRemoveItem(false);

    const result = newValue
      .filter((item) => item.label !== value)
      .map((item) => ({ label: item.label, key: item.key }));
    setNewValue(result);

    dispatch(actionDispatch({ value: result, label: name }));
  };

  return (
    <>
      <Form.Item name={name} label={label}>
        <Select
          mode="multiple"
          allowClear
          style={{ width: '100%', borderRadius: '0px' }}
          optionFilterProp="children"
          onChange={handleChange}
          placeholder={placeholder}
          onSearch={handleSearch}
          onBlur={handleBlur}
          onClear={handleClear}
          onDeselect={handleRemoveItem}
          disabled={check}
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
