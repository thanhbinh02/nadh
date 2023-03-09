import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { Table, Row, Col, Checkbox } from 'antd';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';

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

  const [data, setData] = useState(
    JSON.parse(localStorage.getItem('candidateDetail')).business_line,
  );

  useEffect(() => {
    setChange(
      JSON.parse(localStorage.getItem('candidateDetail'))?.business_line,
    );
  }, [check]);

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
                // onClick={() => handleSetPrimary(text, record)}
              ></Checkbox>
            )}
            {text === 1 && (
              <Checkbox
                checked={true}
                // onClick={() => handleSetPrimary(text, record)}
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
    if (record.primary === 1) {
      setCheck(!check);
      const updatedObj = Object.assign({}, data[record.key], {
        primary: -1,
      });

      const final = [];

      for (let i = 0; i < data.length; i++) {
        if (i !== record.key) {
          final.push(data[i]);
        } else {
          final.push(updatedObj);
        }
      }

      const newData = {
        id: id,
        params: {
          business_line: final,
        },
      };

      dispatch(actionDispatch(newData));
    } else {
      setCheck(!check);

      const updatedObj = Object.assign({}, data[record.key], {
        primary: 1,
      });

      const final = [];

      for (let i = 0; i < data.length; i++) {
        if (i !== record.key) {
          console.log('i', i, data[i]);
          final.push(data[i]);
        } else {
          final.push(updatedObj);
        }
      }

      console.log('final -1', final);

      const newData = {
        id: id,
        params: {
          business_line: final,
        },
      };

      dispatch(actionDispatch(newData));
    }

    // const newData = {
    //   id: id,
    //   params: {
    //     business_line: updateData,
    //   },
    // };

    // console.log('newData', newData);

    // dispatch(actionDispatch(newData));
  };

  const newData = change?.map((item, index) => ({
    key: index,
    primary: item?.primary,
    industry: item?.industry?.label,
    sector: item?.sector?.label,
    category: item?.category?.label,
  }));

  return (
    <>
      {newData?.length !== 0 && (
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
