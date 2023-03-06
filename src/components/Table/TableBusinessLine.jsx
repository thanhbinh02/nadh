import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { Table, Row, Col, Checkbox } from 'antd';
import { useState, useEffect } from 'react';

export const TableBusinessLine = ({
  dataTable,
  check,
  finalResult,
  setCheck,
  id,
  actionDispatch,
  dispatch,
}) => {
  const [change, setChange] = useState(dataTable);

  const columns = [
    {
      title: 'Primary',
      dataIndex: 'primary',
      render: (text, record) => {
        return (
          <>
            {text === -1 && (
              <Checkbox
                checked={false}
                onClick={() => handleSetPrimary(text, record)}
              >
                Checkbox
              </Checkbox>
            )}
            {text === 1 && (
              <Checkbox
                checked={true}
                onClick={() => handleSetPrimary(text, record)}
              >
                Checkbox
              </Checkbox>
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
    let newResult = finalResult;
    newResult.splice(key, 1);

    const newData = {
      id: id,
      params: {
        business_line: newResult,
      },
    };

    dispatch(actionDispatch(newData));
  };

  const handleSetPrimary = (text, record) => {
    const key = record.key;
    const updateData = finalResult.map((item, index) => {
      if (index === key && text === -1) {
        return { ...item, primary: 1 };
      }
      if (index === key && text === 1) {
        return { ...item, primary: -1 };
      }
      return item;
    });

    const newData = {
      id: id,
      params: {
        business_line: updateData,
      },
    };
    dispatch(actionDispatch(newData));
  };

  useEffect(() => {
    setChange(
      JSON.parse(localStorage.getItem('candidateDetail')).business_line,
    );
  }, [check]);

  const newData = change?.map((item, index) => ({
    key: index,
    primary: item?.primary,
    industry: item?.industry?.label,
    sector: item?.sector?.label,
    category: item?.category?.label,
  }));

  return (
    <>
      {newData.length !== 0 && (
        <Row>
          <Col span={24}>
            <Table
              columns={columns}
              dataSource={newData}
              pagination={{
                pageSize: 5,
              }}
            />
          </Col>
        </Row>
      )}
    </>
  );
};
