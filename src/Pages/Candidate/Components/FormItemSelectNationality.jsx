import React from 'react';
import { Form, Select, Space, Button, Modal, Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { InfoCircleOutlined } from '@ant-design/icons';
import { CustomButton } from '../../../components/CustomButton/CustomButton';
import { useQuery } from 'react-query';
import { getNationalityTest } from '../../../apis/filterApi';
import { postNationalityTest } from '../../../apis/filterApi';

const { Option } = Select;
export const FormItemSelectNationality = ({
  name,
  label,
  actionDispatch,
  id,
  detailCandidate,
  nameLocal,
  placeholder,
  defaultValue,
  addItem,
  postData,
  form,
  check,
}) => {
  const keyNewItem = useSelector((state) => state.nationality.keyNationality);
  const dispatch = useDispatch();
  const [showAddItem, setShowAddItem] = useState(false);
  const [fetchData, setFetchData] = useState(true);
  const [open, setOpen] = useState(false);
  const [test, setTest] = useState(defaultValue.map((item) => item.label));
  const [testResult, setTestResult] = useState([]);
  const [checkPost, setCheckPost] = useState(true);
  const [checkFocus, setCheckFocus] = useState(false);

  const [contentModal, setContentModal] = useState();
  const [removeItem, setRemoveItem] = useState(true);

  const { data: dataGet } = useQuery(['get', contentModal], () =>
    getNationalityTest(contentModal),
  );

  useEffect(() => {
    form.setFieldValue(name, test);
  }, []);

  useEffect(() => {}, [checkPost]);

  useEffect(() => {
    if (!check) {
      const uniqueLabels = new Set(
        testResult.filter((item) => item.label).map((item) => item.label),
      );
      const result = [...uniqueLabels];
      form.setFieldValue(name, result);
    }
  }, [fetchData]);

  const handleAgree = () => {
    dispatch(postData(contentModal));
    setCheckPost(!checkPost);
    setOpen(false);
    const hasLabe = dataGet.data.some((item) => item.label === contentModal);
    if (!hasLabe) {
      const currentValue = form.getFieldValue(name);
      setTest((prevValues) => [...currentValue, contentModal]);
    }

    setCheckFocus(true);
    setFetchData(!fetchData);
  };

  const handleOpenModalAdd = () => {
    setOpen(true);
  };

  const handleChange = (value) => {
    // setTest(value);

    const result = dataGet?.data
      .filter((item) => value.includes(item.label))
      .map(({ label, key }) => ({ label, key }));
    const resultPush = testResult;
    resultPush.splice(resultPush.length, 0, ...result);
    setContentModal(undefined);

    const dataDispatch = resultPush.filter((item, index, array) => {
      return (
        array.findIndex((t) => t.label === item.label && t.key === item.key) ===
        index
      );
    });
    if (!id) {
      if (removeItem) {
        const resultFinal = dataDispatch.filter((obj) =>
          value.includes(obj.label),
        );
        dispatch(actionDispatch({ value: resultFinal, label: name }));
      }
    } else {
      const newData = {
        id: id,
        params: {
          [`${name}`]: result,
        },
      };

      const newName = { [`${name}`]: result };
      if (detailCandidate) {
        const newDataInLocal = { ...detailCandidate, ...newName };
        window.localStorage.setItem(nameLocal, JSON.stringify(newDataInLocal));
      }

      // dispatch(actionDispatch(newData));
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

  const handleFocus = () => {
    if (checkFocus) {
      const resultPush = testResult;
      resultPush.push({ key: keyNewItem, label: contentModal });
      const dataDispatch = resultPush.filter((item, index, array) => {
        return (
          array.findIndex(
            (t) => t.label === item.label && t.key === item.key,
          ) === index
        );
      });
      dispatch(actionDispatch({ value: dataDispatch, label: name }));
      setCheckFocus(false);
    }
    setContentModal();
    setFetchData(!fetchData);
  };

  const handleBlur = () => {
    setFetchData(!fetchData);
  };

  const handleClear = () => {
    dispatch(actionDispatch({ value: [], label: name }));
    setTestResult([]);
  };

  const handleRemoveItem = (value) => {
    const resultPush = testResult;
    resultPush.push({ key: keyNewItem, label: contentModal });
    const dataDispatch = resultPush.filter((item, index, array) => {
      return (
        array.findIndex((t) => t.label === item.label && t.key === item.key) ===
        index
      );
    });

    const filteredArr = dataDispatch.filter((obj) => {
      return !(
        obj.label === undefined ||
        obj.key === undefined ||
        obj.label === value
      );
    });
    setTestResult(filteredArr);
    dispatch(actionDispatch({ value: filteredArr, label: name }));

    form.setFieldValue(
      filteredArr,
      filteredArr.map((obj) => obj.label),
    );
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
          onFocus={handleFocus}
          // defaultValue={defaultValue.map((item) => item.label)}
          // defaultValue={['1023']}
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
              {`Do you want to create  ${contentModal} as new nationality?`}
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
