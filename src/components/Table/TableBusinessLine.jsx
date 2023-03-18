import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { Table, Row, Col, Checkbox, Spin } from 'antd';

export const TableBusinessLine = ({
  dataTable,
  finalResult,
  id,
  actionDispatch,
  dispatch,
  setDataTable,
  dataFromRedux,
  businessLine,
  loading,
  setCurrent,
  current,
  setFinalResult,
}) => {
  const columns = [
    {
      title: 'Primary',
      dataIndex: 'primary',
      render: (text, record, index) => {
        return (
          <>
            {text === -1 && (
              <Checkbox
                checked={false}
                onClick={() => handlePrimary(text, record, index)}
              ></Checkbox>
            )}
            {text === 1 && (
              <Checkbox
                checked={true}
                onClick={() => handlePrimary(text, record, index)}
              ></Checkbox>
            )}
          </>
        );
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
      render: (text, record, index) => {
        return (
          <AiOutlineDelete
            style={{ color: 'red', cursor: 'pointer' }}
            onClick={() => handleRemove(text, record, index)}
          />
        );
      },
    },
  ];

  const handleRemove = (text, record) => {
    const key = record.key;

    if (dataFromRedux.length === 0) {
      let newResult = finalResult;
      newResult.splice(key, 1);

      const newData = {
        id: id,
        params: {
          business_line: newResult,
        },
      };
      dispatch(actionDispatch(newData));
    } else {
      let newResult = dataFromRedux.map((item, index) => ({
        primary: item?.primary,
        industry_id: item?.industry?.key,
        sector_id: item?.sector?.key,
        category_id: item?.category?.key,
      }));
      newResult.splice(key, 1);
      const newData = {
        id: id,
        params: {
          business_line: newResult,
        },
      };
      dispatch(actionDispatch(newData));
    }
  };

  const handlePrimary = (text, record) => {
    let newValueIndex = dataTable[record.key];
    if (text === -1) {
      newValueIndex.primary = 1;
    } else {
      newValueIndex.primary = -1;
    }
    let result = [];
    for (let i = 0; i < dataTable.length; i++) {
      if (i !== record.key) {
        result.push(dataTable[i]);
      } else {
        result.push(newValueIndex);
      }
    }
    setDataTable(result);
    if (dataFromRedux.length === 0) {
      let newPutVaLueInput;
      if (text === -1) {
        newPutVaLueInput = { ...businessLine[record.key], primary: 1 };
      } else {
        newPutVaLueInput = { ...businessLine[record.key], primary: -1 };
      }
      let resultPut = [];
      for (let i = 0; i < businessLine.length; i++) {
        if (i !== record.key) {
          resultPut.push(businessLine[i]);
        } else {
          resultPut.push(newPutVaLueInput);
        }
      }
      const newData = {
        id: id,
        params: {
          business_line: resultPut.map((item, index) => ({
            primary: item?.primary,
            industry_id: item?.industry?.key,
            sector_id: item?.sector?.key,
            category_id: item?.category?.key,
          })),
        },
      };

      setFinalResult(
        resultPut.map((item, index) => ({
          primary: item?.primary,
          industry_id: item?.industry?.key,
          sector_id: item?.sector?.key,
          category_id: item?.category?.key,
        })),
      );
      dispatch(actionDispatch(newData));
    } else {
      let newPutVaLueInput;
      if (text === -1) {
        newPutVaLueInput = { ...dataFromRedux[record.key], primary: 1 };
      } else {
        newPutVaLueInput = { ...dataFromRedux[record.key], primary: -1 };
      }
      let resultPut = [];
      for (let i = 0; i < dataFromRedux.length; i++) {
        if (i !== record.key) {
          resultPut.push(dataFromRedux[i]);
        } else {
          resultPut.push(newPutVaLueInput);
        }
      }
      const newData = {
        id: id,
        params: {
          business_line: resultPut.map((item, index) => ({
            primary: item?.primary,
            industry_id: item?.industry?.key,
            sector_id: item?.sector?.key,
            category_id: item?.category?.key,
          })),
        },
      };
      setFinalResult(
        resultPut.map((item, index) => ({
          primary: item?.primary,
          industry_id: item?.industry?.key,
          sector_id: item?.sector?.key,
          category_id: item?.category?.key,
        })),
      );
      dispatch(actionDispatch(newData));
    }
  };

  return (
    <>
      {dataTable?.length !== 0 && (
        <Row>
          <Col span={24}>
            {loading ? (
              <Spin tip="Loading...">
                <Table
                  columns={columns}
                  dataSource={dataTable}
                  pagination={{
                    pageSize: 5,
                    showSizeChanger: false,
                    showQuickJumper: true,
                    current: current,
                  }}
                />
              </Spin>
            ) : (
              <Table
                columns={columns}
                dataSource={dataTable}
                pagination={{
                  pageSize: 5,
                  showSizeChanger: false,
                  showQuickJumper: true,
                  current: current,
                  onChange: (page) => {
                    setCurrent(page);
                  },
                }}
              />
            )}
          </Col>
        </Row>
      )}
    </>
  );
};
