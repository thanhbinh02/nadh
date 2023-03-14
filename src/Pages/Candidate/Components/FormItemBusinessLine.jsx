import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Form, Select, Button, Row, Col, Table, Checkbox, Spin } from 'antd';
import { AiOutlineDelete } from 'react-icons/ai';
import { TableBusinessLine } from '../../../components/Table/TableBusinessLine';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const { Option } = Select;

const columns = [
  {
    title: 'Primary',
    dataIndex: 'primary',
    render: (text) => {
      return <Checkbox defaultValue={text}>Checkbox</Checkbox>;
    },
  },
  {
    title: 'Industry',
    dataIndex: 'industry',
    render: (text) => {
      return <div>{text}</div>;
    },
  },

  {
    title: 'Sector',
    dataIndex: 'sector',
    render: (text) => {
      return <div>{text}</div>;
    },
  },
  {
    title: 'Category',
    dataIndex: 'category',
    render: (text) => {
      return <div>{text}</div>;
    },
  },
  {
    title: 'Action',
    dataIndex: 'action',
    render: () => {
      return <AiOutlineDelete style={{ color: 'red' }} />;
    },
  },
];

const FormItemBusinessLine = ({
  data,
  optionTwo,
  optionThree,
  typeTwo,
  fetchDataItemTwo,
  fetchDataItemThree,
  typeThree,
  form,
  businessLine,
  id,
  actionDispatch,
}) => {
  const dispatch = useDispatch();

  const [listItemTwo, setListItemTwo] = useState(false);
  const [listItemThree, setListItemThree] = useState(false);
  const [openSave, setOpenSave] = useState(false);
  const [finalResult, setfinalResult] = useState(
    businessLine?.map((obj) => ({
      industry_id: obj?.industry?.key,
      sector_id: obj?.sector?.key,
      category_id: obj?.category?.key,
      primary: obj?.primary,
    })),
  );
  const [check, setCheck] = useState(false);
  const [dataTable, setDataTable] = useState(
    businessLine?.map((item, index) => ({
      key: index,
      primary: item?.primary,
      industry: item?.industry?.label,
      sector: item?.sector?.label,
      category: item?.category?.label,
    })),
  );
  const loading = useSelector((state) => state.businessLine.loading);
  const isSuccess = useSelector((state) => state.businessLine.isSuccess);
  const dataFromRedux = useSelector((state) => state.businessLine.data);

  useEffect(() => {
    if (isSuccess) {
      setDataTable(
        dataFromRedux?.map((item, index) => ({
          key: index,
          primary: item?.primary,
          industry: item?.industry?.label,
          sector: item?.sector?.label,
          category: item?.category?.label,
        })),
      );
    }
  }, [loading]);

  useEffect(() => {}, []);

  const handleItemOneChange = (value, option) => {
    if (option) {
      dispatch(
        fetchDataItemTwo({ type: typeTwo, parent_id: Number(option.key) }),
      );
      setListItemTwo(true);
    }
    setOpenSave(true);
    form.setFieldValue('city', undefined);
  };

  const handleClearItemOne = () => {
    form.setFieldValue('country', undefined);
    setListItemTwo(!listItemTwo);
    form.resetFields();
  };

  const handleClearItemTwo = () => {
    setListItemThree(!listItemThree);
    form.setFieldValue('category', undefined);
  };

  const handleItemTwoChange = (value, option) => {
    form.setFieldValue('category', undefined);
    if (option) {
      dispatch(
        fetchDataItemThree({ type: typeThree, parent_id: Number(option.key) }),
      );
      setListItemThree(true);
    }
  };

  const handleCancel = () => {
    form.setFieldValue('country', undefined);
    form.setFieldValue('city', undefined);
    form.setFieldValue('category', undefined);
    setOpenSave(false);
  };

  const handleSaveIndustry = () => {
    const result = {
      industry_id: form.getFieldValue('country'),
      sector_id: form.getFieldValue('city'),
      category_id: form.getFieldValue('category'),
      primary: -1,
    };

    const isResultInArray = finalResult?.some(
      (item) =>
        item.industry_id === result.industry_id &&
        item.sector_id === result.sector_id &&
        item.category_id === result.category_id,
    );

    if (!isResultInArray) {
      let dataPush = finalResult;
      dataPush.unshift(result);
      const newData = {
        id: id,
        params: {
          business_line: finalResult,
        },
      };
      dispatch(actionDispatch(newData));
      setCheck(!check);
      handleCancel();
    } else {
      toast.error('Industry exit', {
        autoClose: 1000,
        position: 'top-right',
      });
    }
  };

  return (
    <>
      <Form.Item label="Industry" style={{ marginBottom: '24px' }}>
        <Row gutter={(12, 12)}>
          <Col span={8}>
            <Form.Item name="country">
              <Select
                onClear={handleClearItemOne}
                placeholder="Select industry"
                showSearch
                onChange={(value, option) => {
                  handleItemOneChange(value, option);
                }}
                optionFilterProp="children"
              >
                {data.map((item) => (
                  <Option value={item.key} key={item.key} label={item.label}>
                    {item.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="city">
              <Select
                onClear={handleClearItemTwo}
                disabled={!form.getFieldValue('country')}
                showSearch
                placeholder="Select sector"
                onChange={(value, option) => {
                  handleItemTwoChange(value, option);
                }}
                optionFilterProp="children"
              >
                {optionTwo &&
                  optionTwo?.map((item) => (
                    <Option value={item.key} key={item.key} label={item.label}>
                      {item.label}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="category">
              <Select
                disabled={!form.getFieldValue('city')}
                showSearch
                placeholder="Select category"
                optionFilterProp="children"
              >
                {optionThree &&
                  optionThree?.map((item) => (
                    <Option value={item.key} key={item.key} label={item.label}>
                      {item.label}
                    </Option>
                  ))}
              </Select>
            </Form.Item>
          </Col>
          {openSave && (
            <Col span={24} style={{ textAlign: 'right', marginTop: '10px' }}>
              <Form.Item>
                <Button
                  danger
                  style={{ marginRight: '10px' }}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button type="primary" onClick={handleSaveIndustry}>
                  Save Industry
                </Button>
              </Form.Item>
            </Col>
          )}
        </Row>
      </Form.Item>
      <>
        {loading ? (
          <Spin tip="Loading...">
            <TableBusinessLine
              dataTable={dataTable}
              check={check}
              finalResult={finalResult}
            />
          </Spin>
        ) : (
          <TableBusinessLine
            dataTable={dataTable}
            check={check}
            finalResult={finalResult}
            setCheck={setCheck}
            id={id}
            actionDispatch={actionDispatch}
            dispatch={dispatch}
            setDataTable={setDataTable}
            dataFromRedux={dataFromRedux}
            businessLine={businessLine}
          />
        )}
      </>
    </>
  );
};
export default FormItemBusinessLine;
