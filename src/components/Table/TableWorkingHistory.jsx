import React from 'react';
import { BsPencil } from 'react-icons/bs';
import { Table, Row, Col, Button } from 'antd';
import { useState, useEffect } from 'react';

export const TableWorkingHistory = ({ data }) => {
  const columns = [
    {
      title: 'Company',
      dataIndex: 'status_current',
      render: (text) => {
        if (text === 1) {
          return <div>Is current school</div>;
        } else return null;
      },
    },
    {
      title: 'Position',
      dataIndex: 'start_time',
      render: (text) => {
        return <div>{text}</div>;
      },
    },

    {
      title: 'Start Time',
      dataIndex: 'end_time',
      render: (text) => {
        return <div>{text}</div>;
      },
    },
    {
      title: 'End Time',
      dataIndex: 'Action',
      render: (text) => {
        return <div>{text}</div>;
      },
    },
  ];

  return (
    <Row>
      <Col
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          alignItems: 'center',
        }}
      >
        <div style={{ fontSize: '18px', fontWeight: '600' }}>
          WORKING HISTORY
        </div>
        <Button type="primary" ghost>
          Add Working History
        </Button>
      </Col>
      <Col span={24}>
        <Table
          columns={columns}
          //   dataSource={data}
          pagination={{
            pageSize: 5,
          }}
        />
      </Col>
    </Row>
  );
};
